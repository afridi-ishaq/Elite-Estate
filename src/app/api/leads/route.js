import { NextResponse, after } from "next/server";
import { auth } from "@/lib/auth";
import { createLead, analyzeLead } from "@/lib/lead-service";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 60;

const VALID_SOURCES = [
  "WEBSITE",
  "FACEBOOK_ADS",
  "GOOGLE_ADS",
  "WHATSAPP",
  "REFERRAL",
  "MANUAL",
];

const str = (v, max) => String(v ?? "").trim().slice(0, max);

export async function POST(request) {
  try {
    const body = await request.json();

    const session = await auth();
    const isAdmin = session?.user?.role === "ADMIN";

    if (!isAdmin) {
      // Honeypot: real visitors never fill this hidden field
      if (body.website) return NextResponse.json({ success: true });

      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        "unknown";

      if (!rateLimit(ip)) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    const name = str(body.name, 100);
    const email = str(body.email, 150);
    const phone = str(body.phone, 30);

    if (!name || !email || !phone || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid name, email and phone are required" },
        { status: 400 }
      );
    }

    // Public visitors can only create WEBSITE leads
    const data = isAdmin
      ? {
          ...body,
          name,
          email,
          phone,
          source: VALID_SOURCES.includes(body.source) ? body.source : "MANUAL",
        }
      : { name, email, phone, message: str(body.message, 2000), source: "WEBSITE" };

    const lead = await createLead(data);

    after(async () => {
      try {
        await analyzeLead(lead.id);
      } catch (err) {
        console.error("AI analysis failed:", err.message);
      }
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}