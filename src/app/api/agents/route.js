import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();

  const agent = await prisma.agent.create({
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