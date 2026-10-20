import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-guard";

export async function POST(request) {
  if (!(await getAdminSession())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const price = Number(body.price);
    if (!body.title || !body.city || !Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { success: false, message: "Title, city and a valid price are required" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        title: String(body.title).trim(),
        description: String(body.description || "").trim(),
        city: String(body.city).trim(),
        price,
        bedrooms: Number(body.bedrooms) || 0,
        bathrooms: Number(body.bathrooms) || 0,
        images: [body.image, body.image2, body.image3, body.image4].filter(Boolean),
        featured: Boolean(body.featured),
        propertyType: body.propertyType || null,
        agentId: body.agentId || null,
      },
    });

    revalidatePath("/properties");
    revalidatePath("/admin/properties");
    if (property.agentId) revalidatePath(`/agents/${property.agentId}`);

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to create property" },
      { status: 500 }
    );
  }
}