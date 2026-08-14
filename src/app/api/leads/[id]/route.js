import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request,
  { params }
) {
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
}