"use client";

import { useRouter } from "next/navigation";

export default function LeadStatusSelect({
  id,
  currentStatus,
}) {
  const router = useRouter();

  async function handleChange(e) {
    const status = e.target.value;

    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    router.refresh();
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      className="
        border
        rounded-lg
        px-3
        py-2
      "
    >
      <option value="NEW">NEW</option>

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