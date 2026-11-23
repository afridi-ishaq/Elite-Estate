
import { getSettings } from "@/lib/settings-service";

function temperatureFromScore(score) {
  if (score >= 70) return "HOT";
  if (score >= 45) return "WARM";
  return "COLD";
}

async function getGeminiKey() {
  try {
    const settings = await getSettings();

    if (settings?.geminiApiKey) {
      return settings.geminiApiKey;
    }
  } catch (error) {
    console.error("[AI] Could not read settings:", error.message);
  }

  return process.env.GEMINI_API_KEY;
}

// Local scoring: works without any external AI API.
function scoreLeadLocally(lead) {
  const name = String(lead.name || "").trim();
  const phone = String(lead.phone || "").trim();
  const message = String(lead.message || "").toLowerCase();
  const source = String(lead.source || "").toUpperCase();

  const combined = `${name} ${message}`.toLowerCase();

  const spamPatterns = [
    /\basdf\b/,
    /\btest test\b/,
    /\bqwerty\b/,
    /\bjust joking\b/,
  ];

  const isSpam =
    spamPatterns.some((pattern) => pattern.test(combined)) ||
    (!name && !phone && !message);

  if (isSpam) {
    return {
      score: 10,
      temperature: "COLD",
      summary: "This inquiry appears incomplete or potentially spam.",
      recommendation:
        "Verify the customer's identity and contact information before proceeding.",
    };
  }

  let score = name && phone ? 50 : 30;

  if (lead.budget !== null && lead.budget !== undefined && Number(lead.budget) > 0) {
    score += 15;
  }

  if (lead.city) score += 10;

  if (lead.propertyType) score += 10;

  const intentPatterns =
    /\b(buy|buying|purchase|invest|investment|visit|details|interested|property|apartment|villa|house|plot|commercial)\b/;

  if (intentPatterns.test(message)) {
    score += 10;
  }

  const urgencyPatterns =
    /\b(urgent|urgently|immediately|soon|this month|ready|cash|asap)\b/;

  if (urgencyPatterns.test(message)) {
    score += 10;
  }

  const goodSources = [
    "REFERRAL",
    "WHATSAPP",
    "FACEBOOK_ADS",
    "GOOGLE_ADS",
  ];

  if (goodSources.includes(source)) {
    score += 5;
  }

  score = Math.min(100, Math.max(0, score));

  return {
    score,
    temperature: temperatureFromScore(score),
    summary: `Customer ${name || "is interested"} contacted Elite Estates${
      lead.propertyType ? ` about ${lead.propertyType}` : ""
    }${lead.city ? ` in ${lead.city}` : ""}. ${
      lead.budget
        ? `Their stated budget is ${lead.budget} PKR.`
        : "No budget has been provided yet."
    }`,
    recommendation: phone
      ? "Contact the customer, confirm their budget and property requirements, and arrange a suitable property consultation."
      : "Obtain a valid phone number before assigning the inquiry to a sales agent.",
  };
}

async function callGemini(apiKey, model, body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(
        `Gemini ${response.status} (${model}): ${errorText}`
      );

      error.status = response.status;
      throw error;
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function generateWithFallback(apiKey, body) {
  const models = [
    process.env.GEMINI_MODEL || "gemini-3.8-flash",
    process.env.GEMINI_FALLBACK_MODEL,
  ].filter((model, index, array) => model && array.indexOf(model) === index);

  for (const model of models) {
    // At most two attempts for temporary server/network errors.
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        console.log(`[AI] Trying model: ${model}`);

        const result = await callGemini(apiKey, model, body);

        console.log(`[AI] Model succeeded: ${model}`);

        return result;
      } catch (error) {
        console.error("[AI] Model failed:", {
          model,
          status: error.status || "NETWORK/TIMEOUT",
          attempt: attempt + 1,
          message: error.message,
        });

        // Quota exhausted: do not waste time retrying this model.
        if (error.status === 429) {
          console.warn(`[AI] Quota exhausted for ${model}. Trying fallback.`);
          break;
        }

        // Authentication, permission, and request errors won't improve
        // with a retry. Move to the next model.
        if (
          error.status &&
          ![500, 503, 504].includes(error.status)
        ) {
          break;
        }

        if (attempt === 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  }

  throw new Error("All configured Gemini models failed.");
}

export async function scoreLead(lead) {
  try {
    const apiKey = await getGeminiKey();

    if (!apiKey) {
      throw new Error("Gemini API key is not configured.");
    }

    const prompt = `You are a lead qualification assistant for a luxury real-estate agency in Pakistan (Elite Estates).

Score this lead from 0 to 100.

Scoring rules:
- Start at 50 for a genuine inquiry with a real name and phone number.
- Add 15 if a budget is given.
- Add 10 if a city or area is given.
- Add 10 if a property type is given.
- Add 10 if the message shows buying, investment, visiting, or property interest.
- Add 10 if there is urgency.
- Add 5 if source is Referral, WhatsApp, Facebook Ads, or Google Ads.
- Do not subtract points for missing information.
- Only score below 30 for obvious spam or fake inquiries.

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

Return JSON only:
- score: integer 0-100
- summary: 2-3 plain sentences
- recommendation: one short, concrete next action`;

    const data = await generateWithFallback(apiKey, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json",
        maxOutputTokens: 1024,
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

    const responseText = (data?.candidates?.[0]?.content?.parts || [])
      .filter((part) => !part.thought)
      .map((part) => part.text || "")
      .join("")
      .trim();

    if (!responseText) {
      throw new Error("Gemini returned an empty response.");
    }

    const parsed = JSON.parse(responseText);

    const score = Math.max(
      0,
      Math.min(100, Math.round(Number(parsed.score)))
    );

    if (!Number.isFinite(score)) {
      throw new Error("Gemini returned an invalid score.");
    }

    console.log("[AI] Lead scored successfully using Gemini:", score);

    return {
      score,
      temperature: temperatureFromScore(score),
      summary: String(parsed.summary || "").trim(),
      recommendation: String(parsed.recommendation || "").trim(),
    };
  } catch (error) {
    console.error(
      "[AI] Gemini unavailable. Switching to local scoring:",
      error.message
    );

    const result = scoreLeadLocally(lead);

    console.log("[AI] Local scoring completed:", {
      score: result.score,
      temperature: result.temperature,
    });

    return result;
  }
}
