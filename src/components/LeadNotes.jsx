"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadNotes({ leadId, initialNotes }) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);

      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) throw new Error("Failed");

      setSaved(true);
      router.refresh(); // refreshes the timeline
    } catch (error) {
      console.error(error);
      alert("Could not save notes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <textarea
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setSaved(false);
        }}
        rows={5}
        placeholder="Add internal notes about this lead..."
        className="w-full border border-gray-300 rounded-xl p-3"
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#0F4C5C] text-white px-5 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-60"
          style={{ color: "white" }}
        >
          {saving ? "Saving..." : "Save Notes"}
        </button>

        {saved && <span className="text-green-600 text-sm">Saved</span>}
      </div>
    </div>
  );
}