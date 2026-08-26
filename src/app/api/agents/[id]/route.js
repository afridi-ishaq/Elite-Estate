import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/admin/agents");
    revalidatePath("/admin");
    revalidatePath(`/admin/agents/${id}`);

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
        where: { id },
    });

    revalidatePath("/admin/agents");
    revalidatePath("/admin");

    return NextResponse.json({
        success: true,
    });
}