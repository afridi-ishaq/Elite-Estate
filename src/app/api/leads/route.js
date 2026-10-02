import { NextResponse } from "next/server";
import { after } from "next/server";
import { createLead, analyzeLead } from "@/lib/lead-service";

const VALID_SOURCES = [
  "WEBSITE",
  "FACEBOOK_ADS",
  "GOOGLE_ADS",
  "WHATSAPP",
  "REFERRAL",
  "MANUAL",
];

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required" },
        { status: 400 }
      );
    }

    const source = VALID_SOURCES.includes(body.source)
      ? body.source
      : "WEBSITE";

    const lead = await createLead({ ...body, source });

    after(async () => {
      try {
        await analyzeLead(lead.id);
      } catch (err) {
        console.error("AI analysis failed:", err.message);
      }
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}