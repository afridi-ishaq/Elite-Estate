import { getSettings } from "@/lib/settings-service";

const API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";

async function getConfig() {
  let s = null;
  try {
    s = await getSettings();
  } catch (err) {
    console.error("Could not read settings:", err.message);
  }

  return {
    token: s?.whatsappToken || process.env.WHATSAPP_TOKEN,
    phoneId: s?.whatsappPhoneId || process.env.WHATSAPP_PHONE_ID,
    to: String(s?.whatsappNumber || process.env.WHATSAPP_NUMBER || "").replace(/\D/g, ""),
  };
}

async function postMessage(cfg, payload) {
  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${cfg.phoneId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: cfg.to,
        ...payload,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`WhatsApp error ${res.status}: ${await res.text()}`);
  }
  return await res.json();
}

function assertConfigured(cfg) {
  if (!cfg.token || !cfg.phoneId || !cfg.to) {
    throw new Error(
      "WhatsApp is not configured. Fill in the number, Phone ID and token in Settings."
    );
  }
}

function formatBudget(budget) {
  if (!budget) return "Not given";
  if (budget >= 10000000) return `${(budget / 10000000).toFixed(2).replace(/\.00$/, "")} Crore`;
  if (budget >= 100000) return `${(budget / 100000).toFixed(1).replace(/\.0$/, "")} Lakh`;
  return String(budget);
}

export async function sendTestMessage() {
  const cfg = await getConfig();
  assertConfigured(cfg);

  return await postMessage(cfg, {
    type: "text",
    text: { body: "✅ Elite Estates: WhatsApp alerts are connected." },
  });
}

export async function sendHotLeadAlert(lead) {
  const cfg = await getConfig();
  assertConfigured(cfg);

  const budget = formatBudget(lead.budget);
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  // Template mode: works outside the 24-hour window
  if (templateName) {
    return await postMessage(cfg, {
      type: "template",
      template: {
        name: templateName,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: lead.name },
              { type: "text", text: budget },
              { type: "text", text: String(lead.aiScore) },
              { type: "text", text: lead.phone },
            ],
          },
        ],
      },
    });
  }

  // Text mode
  const body = [
    "🔥 HOT LEAD",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Budget: ${budget}`,
    `City: ${lead.city || "Not given"}`,
    `Score: ${lead.aiScore}`,
    "",
    `Summary: ${lead.aiSummary}`,
    "",
    `Next step: ${lead.aiRecommendation}`,
  ].join("\n");

  return await postMessage(cfg, { type: "text", text: { body } });
}