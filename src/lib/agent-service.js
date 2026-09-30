import { prisma } from "@/lib/prisma";

export async function getAgents() {
  return await prisma.agent.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getAgentById(id) {
  return await prisma.agent.findUnique({
    where: {
      id,
    },
    include: {
      properties: true,
    },
  });
}