"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] disabled:bg-gray-100 disabled:cursor-not-allowed";

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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Parse numeric fields into actual numbers before sending to the API
      const payload = {
        ...form,
        experience: form.experience !== "" ? parseInt(form.experience, 10) : null,
        listings: form.listings !== "" ? parseInt(form.listings, 10) : null,
      };

      const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to create agent");
        return;
      }

      router.push("/admin/agents");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating the agent.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Link & Header */}
        <div className="mb-6">
          <Link
            href="/admin/agents"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to Agents
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            Add New Agent
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Full Name *</label>
              <input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email *</label>
              <input
                name="email"
                type="email"
                placeholder="john@eliteestates.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Job Title</label>
                <input
                  name="title"
                  placeholder="Senior Property Consultant"
                  value={form.title}
                  onChange={handleChange}
                  disabled={loading}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Experience (Years)</label>
                <input
                  name="experience"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder="5"
                  value={form.experience}
                  onChange={handleChange}
                  disabled={loading}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Listings Count</label>
                <input
                  name="listings"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  placeholder="12"
                  value={form.listings}
                  onChange={handleChange}
                  disabled={loading}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Profile Image URL</label>
              <input
                name="image"
                type="url"
                placeholder="https://..."
                value={form.image}
                onChange={handleChange}
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Agent Bio</label>
              <textarea
                name="bio"
                placeholder="Write a short summary about the agent..."
                rows="5"
                value={form.bio}
                onChange={handleChange}
                disabled={loading}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Link
                href="/admin/agents"
                className="rounded-xl border border-gray-300 px-5 py-3 text-center text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#0F4C5C] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Agent"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}