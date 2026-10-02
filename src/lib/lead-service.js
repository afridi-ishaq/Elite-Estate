import { prisma } from "@/lib/prisma";

export async function getLeads() {
  return await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getLeadById(id) {
  return await prisma.lead.findUnique({
    where: { id },
    include: {
      activities: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function createLead(data) {
  return await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message || null,
      city: data.city || null,
      budget: data.budget ? Number(data.budget) : null,
      propertyType: data.propertyType || null,
      source: data.source || "WEBSITE",
      activities: {
        create: {
          type: "CREATED",
          note: `Lead created via ${data.source || "WEBSITE"}`,
        },
      },
    },
  });
}

export async function updateLeadStatus(id, newStatus) {
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) throw new Error("Lead not found");
  if (lead.status === newStatus) return lead;

  const [updated] = await prisma.$transaction([
    prisma.lead.update({
      where: { id },
      data: { status: newStatus },
    }),
    prisma.leadActivity.create({
      data: {
        leadId: id,
        type: "STATUS_CHANGED",
        fromStatus: lead.status,
        toStatus: newStatus,
      },
    }),
  ]);

  return updated;
}

export async function updateLeadNotes(id, notes) {
  const [updated] = await prisma.$transaction([
    prisma.lead.update({
      where: { id },
      data: { notes },
    }),
    prisma.leadActivity.create({
      data: {
        leadId: id,
        type: "NOTE_UPDATED",
        note: "Notes updated",
      },
    }),
  ]);

  return updated;
}