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