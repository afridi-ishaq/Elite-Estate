import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-guard";

export async function PUT(request, { params }) {
  if (!(await getAdminSession())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required" },
        { status: 400 }
      );
    }

    const agent = await prisma.agent.update({
      where: { id },
      data: {
        name: String(body.name).trim(),
        email: String(body.email).trim(),
        phone: body.phone || null,
        title: body.title || null,
        bio: body.bio || null,
        image: body.image || null,
        experience:
          body.experience !== "" && body.experience != null
            ? Number(body.experience)
            : null,
        listings:
          body.listings !== "" && body.listings != null
            ? Number(body.listings)
            : null,
      },
    });

    revalidatePath("/agents");
    revalidatePath(`/agents/${id}`);
    revalidatePath("/admin/agents");

    return NextResponse.json({ success: true, agent });
  } catch (error) {
    console.error(error);

    const duplicate = error?.code === "P2002";
    return NextResponse.json(
      {
        success: false,
        message: duplicate
          ? "Another agent already uses this email"
          : "Failed to update agent",
      },
      { status: duplicate ? 409 : 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  if (!(await getAdminSession())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    await prisma.agent.delete({ where: { id } });

    revalidatePath("/agents");
    revalidatePath("/admin/agents");
    revalidatePath("/admin/properties");

    return NextResponse.json({
      success: true,
      message: "Agent deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to delete agent" },
      { status: 500 }
    );
  }
}