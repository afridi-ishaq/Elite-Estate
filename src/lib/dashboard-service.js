"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { SOURCE_LABELS } from "@/lib/lead-constants";

export async function getDashboardStats() {
  await requireAdmin();

  const [totalProperties, totalLeads, totalAgents, newLeads, hotLeads, closedLeads] =
    await Promise.all([
      prisma.property.count(),
      prisma.lead.count(),
      prisma.agent.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count({ where: { aiTemperature: "HOT" } }),
      prisma.lead.count({ where: { status: "CLOSED" } }),
    ]);

  const conversionRate = totalLeads
    ? Math.round((closedLeads / totalLeads) * 1000) / 10
    : 0;

  return {
    totalProperties,
    totalLeads,
    totalAgents,
    newLeads,
    hotLeads,
    closedLeads,
    conversionRate,
  };
}

export async function getLeadStatusData() {
  await requireAdmin();

  const rows = await prisma.lead.groupBy({
    by: ["status"],
    _count: { _all: true },
  });

  const statuses = ["NEW", "CONTACTED", "INTERESTED", "VISIT_SCHEDULED", "CLOSED"];

  return statuses.map((status) => ({
    name: status,
    value: rows.find((r) => r.status === status)?._count._all || 0,
  }));
}

export async function getLeadSourceData() {
  await requireAdmin();

  const rows = await prisma.lead.groupBy({
    by: ["source"],
    _count: { _all: true },
  });

  return Object.keys(SOURCE_LABELS).map((source) => ({
    name: SOURCE_LABELS[source],
    value: rows.find((r) => r.source === source)?._count._all || 0,
  }));
}

export async function getRecentLeads() {
  await requireAdmin();

  return await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

export async function getRecentProperties() {
  await requireAdmin();

  return await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

export async function getPropertiesByCity() {
  await requireAdmin();

  const rows = await prisma.property.groupBy({
    by: ["city"],
    _count: { _all: true },
  });

  return rows.map((r) => ({ city: r.city, count: r._count._all }));
}

export async function getLeadsOverTime(range = "3M") {
  await requireAdmin();

  try {
    const now = new Date();
    const startDate = new Date();

    switch (range) {
      case "7D":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30D":
        startDate.setDate(now.getDate() - 30);
        break;
      case "3M":
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "1Y":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 3);
    }

    const leads = await prisma.lead.findMany({
      where: { createdAt: { gte: startDate } },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    });

    if (!leads.length) return [];

    const isShortRange = range === "7D" || range === "30D";

    const counts = leads.reduce((acc, lead) => {
      const date = new Date(lead.createdAt);
      const label = isShortRange
        ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : date.toLocaleDateString("en-US", { month: "short" });

      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map((label) => ({
      month: label,
      leads: counts[label],
    }));
  } catch (error) {
    console.error("Error fetching leads over time:", error);
    return [];
  }
}