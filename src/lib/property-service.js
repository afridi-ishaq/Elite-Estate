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

export async function getFilteredProperties(
  search = ""
) {
  return await prisma.property.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}