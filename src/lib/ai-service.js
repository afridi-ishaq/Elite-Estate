const RETRYABLE = [429, 500, 503, 504];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
import { getSettings } from "@/lib/settings-service";

async function getGeminiKey() {
  try {
    const settings = await getSettings();
    if (settings?.geminiApiKey) return settings.geminiApiKey;
  } catch (err) {
    console.error("Could not read settings:", err.message);
  }
  return process.env.GEMINI_API_KEY;
}

function temperatureFromScore(score) {
  if (score >= 70) return "HOT";
  if (score >= 45) return "WARM";
  return "COLD";
}

async function generateWithRetry(apiKey, body) {
  const models = [
    process.env.GEMINI_MODEL || "gemini-3.8-flash",
    process.env.GEMINI_FALLBACK_MODEL,
  ].filter(Boolean);

  let lastError;

  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify(body),
        }
      );

      if (res.ok) return await res.json();

      const text = await res.text();
      lastError = new Error(`Gemini error ${res.status} (${model}): ${text}`);

      if (!RETRYABLE.includes(res.status)) throw lastError;

      await sleep(1000 * 2 ** attempt);
    }
  }

  throw lastError;
}

export async function scoreLead(lead) {
  const apiKey = await getGeminiKey();
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const prompt = `You are a lead qualification assistant for a luxury real-estate agency in Pakistan (Elite Estates).
Score how promising this lead is, from 0 to 100. Be GENEROUS and practical: a real person who contacted a real-estate agency about property is already a good lead. Do not be strict. Most genuine leads should score between 60 and 95.

How to score:
- START at 50 for any genuine inquiry with a real name and phone number.
- ADD +15 if a budget is given (any reasonable amount counts).
- ADD +10 if a city or area is given.
- ADD +10 if a property type is given.
- ADD +10 if the message shows interest or intent (wants to buy, invest, visit, get details, or asks about a property).
- ADD +10 if there is urgency (soon, immediately, this month, ready, cash).
- ADD +5 if the source is Referral, WhatsApp, Facebook Ads or Google Ads.
- Missing information is NOT a reason to subtract points. Just don't add them.
- Only score BELOW 30 if the lead is clearly spam, fake, a joke, or has no real intent.

Examples:
- Name, phone, budget 5 Crore, city DHA, villa, "want to buy and visit this week" -> 95
- Name, phone, budget and city, message "interested in an apartment" -> 85
- Name, phone, message "please send me details" with no budget -> 65
- Name, phone, empty message, no other details -> 50
- "test", "asdf", or obvious spam -> 10

Budget is in PKR. 1 Crore = 10,000,000 PKR.

Lead:
Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone}
City: ${lead.city || "not given"}
Budget (PKR): ${lead.budget ?? "not given"}
Property type: ${lead.propertyType || "not given"}
Source: ${lead.source}
Message: ${lead.message || "none"}

Respond with JSON only:
- score: integer 0-100
- summary: 2-3 plain sentences describing what the customer wants and how serious they seem
- recommendation: one short, concrete next action for the sales agent`;

  const data = await generateWithRetry(apiKey, {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
      maxOutputTokens: 4096,
      responseSchema: {
        type: "OBJECT",
        properties: {
          score: { type: "INTEGER" },
          summary: { type: "STRING" },
          recommendation: { type: "STRING" },
        },
        required: ["score", "summary", "recommendation"],
      },
    },
  });

  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts
    .filter((p) => !p.thought)
    .map((p) => p.text || "")
    .join("")
    .trim();

  if (!text) throw new Error("Gemini returned an empty response");

  const parsed = JSON.parse(text);
  const score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0)));

  return {
    score,
    temperature: temperatureFromScore(score),
    summary: String(parsed.summary || "").trim(),
    recommendation: String(parsed.recommendation || "").trim(),
  };
}