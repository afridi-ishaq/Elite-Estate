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
  maxPrice = "",
  propertyType = ""
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
        propertyType
              ? {
                propertyType,
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
export async function getRelatedProperties(
  city,
  currentPropertyId
) {
  return await prisma.property.findMany({
    where: {
      city,
      NOT: {
        id: currentPropertyId,
      },
    },

    take: 3,

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFeaturedProperties() {
  return await prisma.property.findMany({
    where: {
      featured: true,
    },

    take: 6,

    orderBy: {
      createdAt: "desc",
    },
  });
}