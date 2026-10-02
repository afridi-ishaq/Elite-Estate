"use client";

import { useState, useTransition } from "react";
import { testWhatsApp } from "@/actions/settings-actions";

export default function WhatsAppTestButton() {
  const [result, setResult] = useState(null);
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    setResult(null);
    startTransition(async () => {
      setResult(await testWhatsApp());
    });
  };

  return (
    <div className="mt-8 pt-8 border-t">
      <h2 className="text-2xl font-bold text-[#0F4C5C] mb-2">Test WhatsApp</h2>
      <p className="text-sm text-gray-500 mb-4">
        Save your settings first, then send a test message.
      </p>

      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="bg-[#C89B3C] px-6 py-3 rounded-xl font-semibold disabled:opacity-60"
        style={{ color: "white" }}
      >
        {pending ? "Sending..." : "Send Test Message"}
      </button>

      {result && (
        <p className={`mt-3 text-sm ${result.success ? "text-green-600" : "text-red-600"}`}>
          {result.message}
        </p>
      )}
    </div>
  );
}