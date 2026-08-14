"use client";

import { useState } from "react";

export default function LeadStatusSelect({
  leadId,
  currentStatus,
}) {
  const [status, setStatus] =
    useState(currentStatus);

  async function updateStatus(newStatus) {
    setStatus(newStatus);

    await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });
  }

  return (
    <select
      value={status}
      onChange={(e) =>
        updateStatus(e.target.value)
      }
      className="
        border
        rounded-xl
        px-4
        py-2
      "
    >
      <option value="NEW">
        NEW
      </option>

      <option value="CONTACTED">
        CONTACTED
      </option>

      <option value="INTERESTED">
        INTERESTED
      </option>

      <option value="VISIT_SCHEDULED">
        VISIT SCHEDULED
      </option>

      <option value="CLOSED">
        CLOSED
      </option>
    </select>
  );
}