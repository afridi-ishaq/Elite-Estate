"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  ["NEW", "NEW"],
  ["CONTACTED", "CONTACTED"],
  ["INTERESTED", "INTERESTED"],
  ["VISIT_SCHEDULED", "VISIT SCHEDULED"],
  ["CLOSED", "CLOSED"],
];

export default function LeadStatusSelect({ leadId, currentStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function updateStatus(newStatus) {
    const previous = status;
    setStatus(newStatus);
    setSaving(true);

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed");
      router.refresh();
    } catch (error) {
      console.error(error);
      setStatus(previous);
      alert("Could not update status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      disabled={saving}
      onChange={(e) => updateStatus(e.target.value)}
      className="border rounded-xl px-4 py-2 disabled:opacity-60"
    >
      {OPTIONS.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}