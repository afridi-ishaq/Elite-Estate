"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";

export async function updateProperty(id, formData) {
  await requireAdmin();

  const existing = await prisma.property.findUnique({
    where: { id },
    select: { agentId: true },
  });

  const agentId = formData.get("agentId") || null;
  const price = Number(formData.get("price"));

  const property = await prisma.property.update({
    where: { id },
    data: {
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      price: Number.isFinite(price) ? price : 0,
      bedrooms: Number(formData.get("bedrooms")) || 0,
      bathrooms: Number(formData.get("bathrooms")) || 0,
      propertyType: formData.get("propertyType") || null,
      agentId,
      images: [
        formData.get("image1"),
        formData.get("image2"),
        formData.get("image3"),
        formData.get("image4"),
      ].filter(Boolean),
    },
  });

  revalidatePath("/properties");
  revalidatePath(`/properties/${property.id}`);
  revalidatePath("/admin/properties");

  // Refresh the portfolio of the old and the new agent
  if (existing?.agentId) revalidatePath(`/agents/${existing.agentId}`);
  if (agentId) revalidatePath(`/agents/${agentId}`);
}