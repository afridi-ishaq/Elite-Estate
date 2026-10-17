"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bot, Send, Sparkles, MapPin, Bed, Bath, CheckCircle2 } from "lucide-react";
import Container from "./Container";

const GREETING = {
  role: "assistant",
  greeting: true,
  content:
    "Hello! I'm the Elite Estates AI assistant. Tell me what you're looking for: city, budget, property type. I'll find matching listings.",
};

const SUGGESTIONS = [
  "3 bedroom house in Islamabad under 5 Crore",
  "Commercial space in Lahore",
  "Plot in Peshawar",
  "I want to talk to an agent",
];

function formatPKR(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "Price on request";
  if (n >= 1e7) return `PKR ${Number((n / 1e7).toFixed(2))} Crore`;
  if (n >= 1e5) return `PKR ${Number((n / 1e5).toFixed(2))} Lakh`;
  return `PKR ${n.toLocaleString("en-PK")}`;
}

function PropertyCard({ p }) {
  return (
    <Link
      href={`/properties/${p.id}`}
      className="flex w-56 shrink-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-28 w-full bg-slate-200">
        {p.image && (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="224px"
            className="object-cover"
          />
        )}
      </div>
      <div className="space-y-1 p-3">
        <p className="truncate text-sm font-bold">{p.title}</p>
        <p className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={12} aria-hidden />
          {p.city}
        </p>
        <p className="text-sm font-extrabold text-[#0F4C5C]">{formatPKR(p.price)}</p>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          {p.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed size={12} aria-hidden />
              {p.bedrooms}
            </span>
          )}
          {p.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath size={12} aria-hidden />
              {p.bathrooms}
            </span>
          )}
          <span className="ml-auto truncate">{p.propertyType || "Property"}</span>
        </div>
      </div>
    </Link>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function send(text) {
    const content = text.trim();
    if (!content || loading) return;

    const userMsg = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .filter((m) => !m.greeting)
            .map((m) => ({ role: m.role, content: m.content })),
          leadSaved,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      if (data.leadSaved) setLeadSaved(true);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          properties: data.properties,
          leadSaved: data.leadSaved,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err.message || "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showSuggestions = messages.length === 1;

  return (
    <section id="ai-assistant" className="py-24">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A3641] via-[#0F4C5C] to-[#0B3A46] p-6 text-white md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <div className="mb-5 flex items-center gap-2 text-[#D9C7A7]">
                <Sparkles size={20} aria-hidden />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  AI Property Assistant
                </span>
              </div>

              <h2 className="font-heading text-4xl font-semibold leading-tight md:text-5xl">
                Let AI find your <span className="text-[#E0B554]">perfect property.</span>
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-white/75">
                Tell our assistant your budget, city and requirements. It
                suggests matching listings instantly and connects you with an
                agent whenever you are ready.
              </p>

              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {[
                  "Ask in English or Roman Urdu",
                  "Matches come from our live listings",
                  "Request a call from an agent in one message",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#E0B554]" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* CHAT */}
            <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F4C5C] text-white">
                  <Bot size={18} aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-bold">Elite Estates Assistant</p>
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Online
                  </p>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
                aria-live="polite"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      m.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-br-sm bg-[#0F4C5C] text-white"
                          : "rounded-bl-sm bg-slate-100 text-slate-800"
                      }`}
                    >
                      {m.content}
                    </div>

                    {m.properties?.length > 0 && (
                      <div className="mt-3 flex max-w-full gap-3 overflow-x-auto pb-1">
                        {m.properties.map((p) => (
                          <PropertyCard key={p.id} p={p} />
                        ))}
                      </div>
                    )}

                    {m.leadSaved && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 size={14} aria-hidden />
                        Request sent. An agent will contact you soon.
                      </p>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                    </div>
                  </div>
                )}
              </div>

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 px-4 pb-3">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-[#0F4C5C] hover:text-[#0F4C5C]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2 border-t border-slate-100 p-3"
              >
                <label className="sr-only" htmlFor="assistant-input">
                  Message
                </label>
                <input
                  id="assistant-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  placeholder="e.g. 4 bed villa in DHA, budget 8 Crore"
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C89B3C] text-white transition hover:bg-[#B58A2F] disabled:opacity-50"
                >
                  <Send size={18} aria-hidden />
                </button>
              </form>

              <p className="px-4 pb-3 text-center text-[11px] text-slate-400">
                AI suggestions are a guide. An agent confirms availability and prices.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}