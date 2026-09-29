"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAgentPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
    image: "",
    experience: "",
    listings: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      router.push("/admin/agents");
      router.refresh();
    } else {
      alert(data.message || "Failed to create agent");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-md p-8">

          <h1 className="text-3xl font-bold mb-8">
            Add New Agent
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-3"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-3"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <textarea
              name="bio"
              placeholder="Agent Bio"
              rows="5"
              value={form.bio}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <input
              name="image"
              placeholder="Profile Image URL"
              value={form.image}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                name="experience"
                type="number"
                placeholder="Experience (years)"
                value={form.experience}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <input
                name="listings"
                type="number"
                placeholder="Listings"
                value={form.listings}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F4C5C] text-white py-3 rounded-xl font-semibold"
            >
              {loading ? "Saving..." : "Create Agent"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}