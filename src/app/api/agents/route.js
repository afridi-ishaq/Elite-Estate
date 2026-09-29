import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const agent = await prisma.agent.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        title: body.title || null,
        bio: body.bio || null,
        image: body.image || null,
        experience: body.experience
          ? Number(body.experience)
          : null,
        listings: body.listings
          ? Number(body.listings)
          : null,
      },
    });

    return NextResponse.json({
      success: true,
      agent,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create agent",
      },
      { status: 500 }
    );
  }
}