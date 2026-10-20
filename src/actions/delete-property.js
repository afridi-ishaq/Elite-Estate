"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";

export async function deleteProperty(id) {
  await requireAdmin();

  await prisma.property.delete({
    where: { id },
  });

  revalidatePath("/properties");
  revalidatePath("/admin/properties");
}