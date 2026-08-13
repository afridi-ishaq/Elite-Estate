import { prisma } from "./prisma";

export async function getDashboardStats() {
  const properties = await prisma.property.count();
  const leads = await prisma.lead.count();
  const agents = await prisma.user.count({
    where: {
      role: "AGENT",
    },
  });

  return {
    properties,
    leads,
    agents,
  };
}