"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]";

export default function EditAgentForm({ agent }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: agent.name ?? "",
    email: agent.email ?? "",
    phone: agent.phone ?? "",
    title: agent.title ?? "",
    bio: agent.bio ?? "",
    image: agent.image ?? "",
    experience: agent.experience ?? "",
    listings: agent.listings ?? "",
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
        headers: { "Content-Type": "application/json" },
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
    const confirmed = confirm("Are you sure you want to delete this agent?");
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
    <main className="min-h-screen bg-gray-50 px-4 pb-24 pt-20 sm:px-6 md:p-12 lg:p-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between md:mb-8">
          <div className="min-w-0">
            <Link
              href="/admin/agents"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              ← Back to Agents
            </Link>

            <h1 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
              Edit Agent
            </h1>

            <p className="mt-1 text-gray-500">Update agent information.</p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="self-start rounded-xl bg-red-50 px-5 py-2.5 text-red-600 hover:bg-red-100"
          >
            Delete Agent
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Phone</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Job Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Senior Property Consultant"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Experience (Years)
              </label>
              <input
                name="experience"
                type="number"
                min="0"
                inputMode="numeric"
                value={form.experience}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Listings</label>
              <input
                name="listings"
                type="number"
                min="0"
                inputMode="numeric"
                value={form.listings}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Profile Image URL
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">
            <Link
              href="/admin/agents"
              className="rounded-xl border px-5 py-3 text-center hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#0F4C5C] px-6 py-3 text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}