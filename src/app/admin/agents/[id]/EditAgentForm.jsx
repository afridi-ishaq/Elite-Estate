"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditAgentForm({ agent }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: agent.name || "",
    email: agent.email || "",
    phone: agent.phone || "",
    title: agent.title || "",
    bio: agent.bio || "",
    image: agent.image || "",
    experience: agent.experience || "",
    listings: agent.listings || "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to update agent");
        return;
      }

      router.push("/admin/agents");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this agent?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to delete agent");
        return;
      }

      router.push("/admin/agents");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin/agents"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              ← Back to Agents
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mt-3">
              Edit Agent
            </h1>

            <p className="text-gray-500 mt-1">
              Update agent information.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
          >
            Delete Agent
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Job Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Senior Property Consultant"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Experience (Years)
              </label>

              <input
                name="experience"
                type="number"
                min="0"
                value={form.experience}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Listings */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Listings
              </label>

              <input
                name="listings"
                type="number"
                min="0"
                value={form.listings}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Profile Image URL
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Bio
              </label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={5}
                className="w-full border rounded-xl px-4 py-3 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Link
              href="/admin/agents"
              className="px-5 py-3 rounded-xl border hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#0F4C5C] text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}