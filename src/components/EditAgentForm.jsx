"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditAgentForm({
  agent,
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: agent.name || "",
    email: agent.email || "",
    phone: agent.phone || "",
    title: agent.title || "",
    bio: agent.bio || "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      `/api/agents/${agent.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data =
      await response.json();

    if (data.success) {
      router.push("/admin/agents");
      router.refresh();
    }
  }
  async function handleDelete() {
  const confirmed = confirm(
    "Delete this agent?"
  );

  if (!confirmed) return;

  const response = await fetch(
    `/api/agents/${agent.id}`,
    {
      method: "DELETE",
    }
  );

  const data =
    await response.json();

  if (data.success) {
    router.push("/admin/agents");
    router.refresh();
  }
}

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <input
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <input
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <input
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <textarea
        rows={5}
        value={form.bio}
        onChange={(e) =>
          setForm({
            ...form,
            bio: e.target.value,
          })
        }
        className="w-full border p-3 rounded-xl"
      />

      <button
        type="submit"
        className="
          bg-[#0F4C5C]
          text-white
          px-6
          py-3
          rounded-xl
        "
      >
        Update Agent
      </button>
      <button
        type="button"
        onClick={handleDelete}
        className="
            bg-red-600
            text-white
            px-6
            py-3
            rounded-xl
            ml-4
        "
        >
        Delete Agent
        </button>
    </form>
  );
}