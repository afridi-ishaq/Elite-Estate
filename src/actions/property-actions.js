"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProperty(id, formData) {
  console.log("Updating property:", id);

  await prisma.property.update({
    where: {
      id,
    },
    data: {
      title: formData.get("title"),
      description: formData.get("description"),
      city: formData.get("city"),
      price: Number(formData.get("price")),
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      images: [formData.get("image")],
    },
  });

  console.log("Property updated");

  revalidatePath("/admin/properties");
}