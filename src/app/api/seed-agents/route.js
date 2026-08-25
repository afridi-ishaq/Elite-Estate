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
