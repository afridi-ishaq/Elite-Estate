import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();

    const lead = await prisma.lead.update({
      where: {
        id,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}