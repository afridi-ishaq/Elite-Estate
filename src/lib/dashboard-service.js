"use server";
import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const totalProperties = await prisma.property.count();

  const totalLeads = await prisma.lead.count();

  const totalAgents = await prisma.user.count({
    where: {
      role: "AGENT",
    },
  });

  const newLeads = await prisma.lead.count({
    where: {
      status: "NEW",
    },
  });

  return {
    totalProperties,
    totalLeads,
    totalAgents,
    newLeads,
  };
}

export async function getLeadStatusData() {
  const leads =
    await prisma.lead.findMany();

  const statuses = [
    "NEW",
    "CONTACTED",
    "INTERESTED",
    "VISIT_SCHEDULED",
    "CLOSED",
  ];

  return statuses.map((status) => ({
    name: status,
    value: leads.filter(
      (lead) =>
        lead.status === status
    ).length,
  }));
}

export async function getRecentLeads() {
  return await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

export async function getRecentProperties() {
  return await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

export async function getPropertiesByCity() {
  const properties =
    await prisma.property.findMany();

  const grouped = {};

  properties.forEach((property) => {
    grouped[property.city] =
      (grouped[property.city] || 0) + 1;
  });

  return Object.entries(grouped).map(
    ([city, count]) => ({
      city,
      count,
    })
  );
}

// export async function getLeadsOverTime() {
//   try {
//     const leads = await prisma.lead.findMany({
//       orderBy: {
//         createdAt: "asc",
//       },
//       select: {
//         createdAt: true,
//       },
//     });

//     if (!leads.length) return [];

//     // Group leads by Month (e.g., "Jan", "Feb")
//     const monthCounts = leads.reduce((acc, lead) => {
//       const monthName = new Date(lead.createdAt).toLocaleString("en-US", {
//         month: "short",
//       });

//       acc[monthName] = (acc[monthName] || 0) + 1;
//       return acc;
//     }, {});

//     // Convert object to array for Recharts
//     return Object.keys(monthCounts).map((month) => ({
//       month,
//       leads: monthCounts[month],
//     }));
//   } catch (error) {
//     console.error("Error fetching leads growth over time:", error);
//     return [];
//   }
// }


export async function getLeadsOverTime(range = "3M") {
  try {
    const now = new Date();
    let startDate = new Date();

    // 1. Calculate Start Date filter
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

    // 2. Fetch leads from database within date range
    const leads = await prisma.lead.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        createdAt: true,
      },
    });

    if (!leads.length) return [];

    // 3. Format dynamic label (Days for 7D/30D, Months for 3M/1Y)
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