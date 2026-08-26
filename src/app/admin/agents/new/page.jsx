"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAgentPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) {
      router.push("/admin/agents");
      router.refresh();
    }
  }

  return (
    <main className="pt-10 pb-24 max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-3xl shadow-md">
        <h1 className="text-4xl font-bold mb-8">
          Add Agent
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            placeholder="Name"
            className="w-full border p-3 rounded-xl"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone"
            className="w-full border p-3 rounded-xl"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            placeholder="Job Title"
            className="w-full border p-3 rounded-xl"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Bio"
            className="w-full border p-3 rounded-xl"
            rows={5}
            value={form.bio}
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value,
              })
            }
          />

          <button
            className="
              bg-[#0F4C5C]
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Save Agent
          </button>
        </form>
      </div>
    </main>
  );
}