import { NextResponse, after } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { createLead, analyzeLead } from "@/lib/lead-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const API_VERSION = process.env.FACEBOOK_API_VERSION || "v21.0";

// 1. GET: Verification Handshake with Meta
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const EXPECTED_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN || "elite_estates_verify_2026";

  if (
    searchParams.get("hub.mode") === "subscribe" &&
    searchParams.get("hub.verify_token") === EXPECTED_TOKEN
  ) {
    return new Response(searchParams.get("hub.challenge"), { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

// Helper: Secure HMAC SHA256 Signature Verification
function validSignature(rawBody, header) {
  const secret = process.env.FACEBOOK_APP_SECRET;
  if (!secret || !header) return false;

  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const headerBuffer = Buffer.from(header, "utf8");

  if (expectedBuffer.length !== headerBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, headerBuffer);
}

// Process Incoming Meta Lead Data
async function processLeadgen(leadgenId) {
  const exists = await prisma.lead.findUnique({
    where: { facebookLeadId: leadgenId },
  });
  if (exists) return;

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${leadgenId}?access_token=${process.env.FACEBOOK_PAGE_TOKEN}`
  );
  if (!res.ok) {
    throw new Error(`Facebook error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
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

  try {
    await analyzeLead(lead.id);
  } catch (err) {
    console.error("AI analysis failed:", err.message);
  }
}

// 2. POST: Handle Incoming Webhook Events
export async function POST(request) {
  const rawBody = await request.text();

  // Signature check (Disabled temporarily during initial local test if process.env.FACEBOOK_APP_SECRET is unset)
  if (process.env.FACEBOOK_APP_SECRET && !validSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  const body = JSON.parse(rawBody);

  after(async () => {
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === "leadgen" && change.value?.leadgen_id) {
          try {
            await processLeadgen(String(change.value.leadgen_id));
          } catch (err) {
            console.error("Facebook lead failed:", err.message);
          }
        }
      }
    }
  });

  return NextResponse.json({ received: true });
}