"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalyzeButton({ leadId, hasAnalysis }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/leads/${leadId}/analyze`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("AI analysis failed. Check your Gemini API key and model name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-[#0F4C5C] px-5 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-60"
      style={{ color: "white" }}
    >
      {loading ? "Analyzing..." : hasAnalysis ? "Re-analyze" : "Analyze with AI"}
    </button>
  );
}