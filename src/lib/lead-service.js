import { prisma } from "@/lib/prisma";

export async function getLeads() {
  return await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}