import { prisma } from "@/lib/prisma";

export async function getAdminProperties() {
  return prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}