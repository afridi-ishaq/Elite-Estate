import { prisma } from "@/lib/prisma";

export async function getProperties() {
  return await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPropertyById(id) {
  return await prisma.property.findUnique({
    where: {
      id,
    },
  });
}