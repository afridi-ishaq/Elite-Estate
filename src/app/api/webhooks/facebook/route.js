import { NextResponse, after } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { createLead, analyzeLead } from "@/lib/lead-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const API_VERSION = process.env.FACEBOOK_API_VERSION || "v21.0";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  if (
    searchParams.get("hub.mode") === "subscribe" &&
    searchParams.get("hub.verify_token") === process.env.FACEBOOK_VERIFY_TOKEN
  ) {
    return new Response(searchParams.get("hub.challenge"), { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

function validSignature(rawBody, header) {
  const secret = process.env.FACEBOOK_APP_SECRET;
  if (!secret || !header) return false;

  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function processLeadgen(leadgenId) {
  console.log("[FB] 1. Received leadgen id:", leadgenId);

  const exists = await prisma.lead.findUnique({
    where: { facebookLeadId: leadgenId },
  });
  if (exists) {
    console.log("[FB] Already saved, skipping:", leadgenId);
    return;
  }

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${leadgenId}?access_token=${process.env.FACEBOOK_PAGE_TOKEN}`
  );
  if (!res.ok) {
    throw new Error(`Facebook error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  console.log("[FB] 2. Lead fetched from Facebook. Fields:",
    (data.field_data || []).map((f) => f.name).join(", "));

  const fields = {};
  for (const f of data.field_data || []) {
    fields[f.name] = (f.values || [])[0] || "";
  }

  const name =
    fields.full_name ||
    [fields.first_name, fields.last_name].filter(Boolean).join(" ") ||
    "Facebook Lead";

  const phone = fields.phone_number || fields.phone || "Not provided";
  const email = fields.email || `no-email-${leadgenId}@facebook.lead`;

  const known = [
    "full_name", "first_name", "last_name",
    "email", "phone_number", "phone", "city",
  ];
  const message = Object.entries(fields)
    .filter(([k, v]) => !known.includes(k) && v)
    .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
    .join("\n");

  const lead = await createLead({
    name,
    email,
    phone,
    city: fields.city || null,
    message: message || null,
    source: "FACEBOOK_ADS",
    facebookLeadId: leadgenId,
  });
  console.log("[FB] 3. Lead saved in database. id:", lead.id);

  try {
    await analyzeLead(lead.id);
    console.log("[FB] 4. AI analysis done");
  } catch (err) {
    console.error("[FB] AI analysis failed:", err.message);
  }
}

export async function POST(request) {
  const rawBody = await request.text();

  if (!validSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    console.error("[FB] Invalid signature. Check FACEBOOK_APP_SECRET.");
    return new Response("Invalid signature", { status: 401 });
  }

  const body = JSON.parse(rawBody);
  console.log("[FB] Webhook POST received and signature OK");

  after(async () => {
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === "leadgen" && change.value?.leadgen_id) {
          try {
            await processLeadgen(String(change.value.leadgen_id));
          } catch (err) {
            console.error("[FB] Lead failed:", err.message);
          }
        }
      }
    }
  });

  return NextResponse.json({ received: true });
}