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

    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required" },
        { status: 400 }
      );
    }

    const agent = await prisma.agent.create({
      data: {
        name: String(body.name).trim(),
        email: String(body.email).trim(),
        phone: body.phone || null,
        title: body.title || null,
        bio: body.bio || null,
        image: body.image || null,
        experience: body.experience ? Number(body.experience) : null,
        listings: body.listings ? Number(body.listings) : null,
      },
    });

    revalidatePath("/agents");
    revalidatePath("/admin/agents");

    return NextResponse.json({ success: true, agent });
  } catch (error) {
    console.error(error);

    const duplicate = error?.code === "P2002";
    return NextResponse.json(
      {
        success: false,
        message: duplicate
          ? "An agent with this email already exists"
          : "Failed to create agent",
      },
      { status: duplicate ? 409 : 500 }
    );
  }
}