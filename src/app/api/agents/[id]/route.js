import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const { id } = await params;

  const body = await request.json();

  const agent = await prisma.agent.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      title: body.title,
      bio: body.bio,
    },
  });

  return NextResponse.json({
    success: true,
    agent,
  });
}


export async function DELETE(
  request,
  { params }
) {
  const { id } = await params;

  await prisma.agent.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}