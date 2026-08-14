"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProperty(id) {
  await prisma.property.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/properties");
}