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
  search = "",
  city = "",
  minPrice = "",
  maxPrice = ""
) {
  return await prisma.property.findMany({
    where: {
      AND: [
        {
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

        city
          ? {
              city,
            }
          : {},

        minPrice
          ? {
              price: {
                gte: Number(minPrice),
              },
            }
          : {},

        maxPrice
          ? {
              price: {
                lte: Number(maxPrice),
              },
            }
          : {},
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}