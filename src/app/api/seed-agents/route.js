import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await prisma.agent.createMany({
    data: [
      {
        name: "Ahmed Khan",
        email: "ahmed@eliteestates.com",
        phone: "03001234567",
        title: "Senior Property Consultant",
      },
      {
        name: "Sara Ali",
        email: "sara@eliteestates.com",
        phone: "03007654321",
        title: "Luxury Property Advisor",
      },
    ],
  });

  return NextResponse.json({
    success: true,
  });
}
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const count = await prisma.agent.count();

  return NextResponse.json({
    count,
  });
}