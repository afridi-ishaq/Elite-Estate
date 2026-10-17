import { NextResponse, after } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { createLead, analyzeLead } from "@/lib/lead-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  if (
    searchParams.get("hub.mode") === "subscribe" &&
    searchParams.get("hub.verify_token") === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return new Response(searchParams.get("hub.challenge"), { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

function validSignature(rawBody, header) {
  const secret = process.env.FACEBOOK_APP_SECRET;
  if (!secret || !header) return false;

  const expected =
    "sha256=" + crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function handleMessage(from, name, text) {
  const phone = `+${from}`;

  const existing = await prisma.lead.findFirst({
    where: { phone, source: "WHATSAPP" },
  });
  if (existing) {
    console.log("[WA] Lead already exists for", phone);
    return;
  }

  const lead = await createLead({
    name: name || "WhatsApp Contact",
    email: `${from}@whatsapp.lead`,
    phone,
    message: text || null,
    source: "WHATSAPP",
  });
  console.log("[WA] Lead saved:", lead.id);

  try {
    await analyzeLead(lead.id);
    console.log("[WA] AI analysis done");
  } catch (err) {
    console.error("[WA] AI analysis failed:", err.message);
  }
}

export async function POST(request) {
  const rawBody = await request.text();

  if (!validSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    console.error("[WA] Invalid signature. Check FACEBOOK_APP_SECRET.");
    return new Response("Invalid signature", { status: 401 });
  }

  console.log("[WA] Webhook POST received and signature OK");

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    console.error("[WA] Body is not valid JSON");
    return NextResponse.json({ received: true });
  }

  // Shows exactly what Meta sent, so we can see which field it was
  console.log("[WA] Payload:", rawBody.slice(0, 800));

  after(async () => {
    let messageCount = 0;

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const value = change.value || {};
        const contacts = value.contacts || [];

        for (const msg of value.messages || []) {
          messageCount++;
          const contact = contacts.find((c) => c.wa_id === msg.from);
          try {
            await handleMessage(
              msg.from,
              contact?.profile?.name,
              msg.text?.body
            );
          } catch (err) {
            console.error("[WA] Message failed:", err.message);
          }
        }
      }
    }

    if (messageCount === 0) {
      console.log("[WA] No incoming messages in this payload (field:", body.entry?.[0]?.changes?.[0]?.field, ")");
    }
  });

  return NextResponse.json({ received: true });
}