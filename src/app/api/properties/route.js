import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const property = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        city: body.city,
        price: Number(body.price),
        bedrooms: Number(body.bedrooms),
        bathrooms: Number(body.bathrooms),
        image: body.image,
        featured: body.featured,
        propertyType: body.propertyType,
      }
    });

    return NextResponse.json({
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create property",
      },
      { status: 500 }
    );
  }
}