import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await prisma.property.createMany({
    data: [
      {
        title: "Luxury Villa Islamabad",
        description:
          "Premium luxury villa located in Islamabad.",
        city: "Islamabad",
        price: 45000000,
        bedrooms: 5,
        bathrooms: 5,
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        featured: true,
      },
      {
        title: "Modern Apartment Lahore",
        description:
          "Modern apartment in Lahore.",
        city: "Lahore",
        price: 22000000,
        bedrooms: 3,
        bathrooms: 2,
        image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        featured: true,
      },
      {
        title: "Commercial Plaza Karachi",
        description:
          "Prime commercial plaza in Karachi.",
        city: "Karachi",
        price: 120000000,
        bedrooms: 0,
        bathrooms: 4,
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        featured: true,
      },
    ],
  });

  return NextResponse.json({
    success: true,
    message: "Properties seeded successfully",
  });
}