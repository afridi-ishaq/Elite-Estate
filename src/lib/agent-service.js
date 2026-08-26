import { prisma } from "@/lib/prisma";

export async function getAgents() {
  return await prisma.agent.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAgentById(id) {
  return await prisma.agent.findUnique({
    where: {
      id,
    },
  });
}