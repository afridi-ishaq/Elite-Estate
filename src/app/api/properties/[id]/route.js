import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request,
  { params }
) {
  const { id } = await params;

  await prisma.property.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}