import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PATCH(request, { params }) {
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

  revalidatePath("/admin/leads");
  revalidatePath("/admin");

  return NextResponse.json(lead);
}