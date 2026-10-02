import { prisma } from "@/lib/prisma";
import { scoreLead } from "@/lib/ai-service";
import { sendHotLeadAlert } from "@/lib/whatsapp-service";

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

export async function analyzeLead(id) {
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) throw new Error("Lead not found");

  const result = await scoreLead(lead);

  const [updated] = await prisma.$transaction([
    prisma.lead.update({
      where: { id },
      data: {
        aiScore: result.score,
        aiTemperature: result.temperature,
        aiSummary: result.summary,
        aiRecommendation: result.recommendation,
        aiAnalyzedAt: new Date(),
      },
    }),
    prisma.leadActivity.create({
      data: {
        leadId: id,
        type: "AI_ANALYZED",
        note: `AI analysis: ${result.temperature} lead (score ${result.score})`,
      },
    }),
  ]);

  // WhatsApp alert for HOT leads, once per lead.
  // A failure here must never break the analysis itself.
  if (updated.aiTemperature === "HOT" && !updated.whatsappAlertedAt) {
    try {
      await sendHotLeadAlert(updated);
      await prisma.$transaction([
        prisma.lead.update({
          where: { id },
          data: { whatsappAlertedAt: new Date() },
        }),
        prisma.leadActivity.create({
          data: {
            leadId: id,
            type: "WHATSAPP_ALERT",
            note: "HOT lead alert sent via WhatsApp",
          },
        }),
      ]);
    } catch (err) {
      console.error("WhatsApp alert failed:", err.message);
    }
  }

  return updated;
}