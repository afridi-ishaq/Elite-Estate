import { NextResponse, after } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { runAssistant, findMatches } from "@/lib/assistant-service";
import { createLead, analyzeLead } from "@/lib/lead-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

    if (!rateLimit(`assistant:${ip}`, 20, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "You have sent a lot of messages. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim()
      )
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 500) }));

    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const result = await runAssistant(messages);
    const { properties, relaxed } = await findMatches(result.filters);

    let reply = result.reply;
    const hasFilter = Object.values(result.filters).some(Boolean);

    if (hasFilter && !properties.length) {
      reply +=
        " I could not find an exact match in our current listings, but an agent can search off-market options for you.";
    } else if (relaxed) {
      reply +=
        " I could not match every detail, so these are the closest options in that city.";
    }

    // Save a lead once the visitor has given a name and a phone number
    let leadSaved = false;
    const digits = result.contact.phone.replace(/\D/g, "");

    if (!body.leadSaved && result.contact.name && digits.length >= 10) {
      const transcript = messages
        .filter((m) => m.role === "user")
        .map((m) => m.content)
        .join("\n")
        .slice(0, 1500);

      const lead = await createLead({
        name: result.contact.name,
        email:
          result.contact.email.includes("@")
            ? result.contact.email
            : `no-email-${Date.now()}@assistant.lead`,
        phone: result.contact.phone.replace(/[^\d+]/g, ""),
        city: result.filters.city || null,
        budget: result.filters.maxPrice || null,
        propertyType: result.filters.propertyType || null,
        message: `Via homepage AI assistant.\n\n${transcript}`,
        source: "WEBSITE",
      });

      leadSaved = true;

      after(async () => {
        try {
          await analyzeLead(lead.id);
        } catch (err) {
          console.error("AI analysis failed:", err.message);
        }
      });
    }

    return NextResponse.json({
      reply,
      properties: properties.map((p) => ({
        id: p.id,
        title: p.title,
        city: p.city,
        price: p.price,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        propertyType: p.propertyType,
        image: p.images?.[0] || null,
      })),
      leadSaved,
    });
  } catch (error) {
    console.error("Assistant error:", error.message);
    return NextResponse.json(
      { error: "The assistant is busy right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}