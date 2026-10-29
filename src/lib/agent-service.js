import { prisma } from "@/lib/prisma";

export async function getAgents() {
  return await prisma.agent.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { properties: true } },
    },
  });
}

export async function getAgentById(id) {
  return await prisma.agent.findUnique({
    where: { id },
    include: {
      properties: true,
    },
  });
}