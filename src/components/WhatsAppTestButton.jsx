
"use client";

import { useState, useTransition } from "react";
import { testWhatsApp } from "@/actions/settings-actions";
import {
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function WhatsAppTestButton() {
  const [result, setResult] = useState(null);
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    setResult(null);

    startTransition(async () => {
      try {
        const response = await testWhatsApp();
        setResult(response);
      } catch (error) {
        setResult({
          success: false,
          message: "Something went wrong while sending the test message.",
        });
      }
    });
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
          <MessageCircle size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            WhatsApp Connection Test
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Verify your WhatsApp Cloud API configuration.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-3 rounded-xl border border-[#D9C7A7]/40 bg-[#D9C7A7]/15 p-4">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-[#0F4C5C]"
          />

          <p className="text-sm leading-6 text-slate-600">
            Save your WhatsApp settings first. Then send a test message
            to verify that your integration is configured correctly.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClick}
          disabled={pending}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C5C] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b3844] focus:outline-none focus:ring-4 focus:ring-[#0F4C5C]/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending Test Message...
            </>
          ) : (
            <>
              <Send size={17} />
              Send Test Message
            </>
          )}
        </button>

        {/* Result */}
        {result && (
          <div
            role="status"
            className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${
              result.success
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            {result.success ? (
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-green-600"
              />
            ) : (
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0 text-red-600"
              />
            )}

            <div>
              <p
                className={`text-sm font-semibold ${
                  result.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.success ? "Test completed" : "Test failed"}
              </p>

              <p
                className={`mt-1 text-sm leading-5 ${
                  result.success ? "text-green-700" : "text-red-700"
                }`}
              >
                {result.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
