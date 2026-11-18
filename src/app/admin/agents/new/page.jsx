
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  User,
  Mail,
  Phone,
  BriefcaseBusiness,
  CalendarDays,
  Building2,
  Image,
  FileText,
  ArrowLeft,
  Save,
  Loader2,
  UserPlus,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/10 disabled:cursor-not-allowed disabled:bg-slate-100";

function FormField({ label, icon: Icon, children, required = false }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Icon size={16} className="text-[#0F4C5C]" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

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
      const payload = {
        ...form,
        experience:
          form.experience !== ""
            ? parseInt(form.experience, 10)
            : null,
        listings:
          form.listings !== ""
            ? parseInt(form.listings, 10)
            : null,
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
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Page heading */}
        <div className="mb-8">
          <Link
            href="/admin/agents"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#0F4C5C]"
          >
            <ArrowLeft size={16} />
            Back to Agents
          </Link>

          <p className="mb-2 text-sm font-semibold text-[#0F4C5C]">
            ADMINISTRATION / AGENTS
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Create New Agent
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a new real estate professional to your team.
          </p>
        </div>

        {/* Main form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Gradient header */}
          <div className="bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-6 py-7 text-white sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <UserPlus size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Agent Information
                </h2>
                <p className="mt-1 text-sm text-white/75">
                  Complete the information below to create an agent profile.
                </p>
              </div>
            </div>
          </div>

          {/* Form content */}
          <div className="space-y-10 p-6 sm:p-8">

            {/* Personal information */}
            <section>
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800">
                    Personal Information
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Enter the agent's basic contact details.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <FormField label="Full Name" icon={User} required>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Email Address" icon={Mail} required>
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
                </FormField>

                <FormField label="Phone Number" icon={Phone}>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Job Title" icon={BriefcaseBusiness}>
                  <input
                    name="title"
                    placeholder="Senior Property Consultant"
                    value={form.title}
                    onChange={handleChange}
                    disabled={loading}
                    className={inputClass}
                  />
                </FormField>

              </div>
            </section>

            {/* Professional details */}
            <section>
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
                  <Building2 size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800">
                    Professional Details
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Specify experience and property listing information.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <FormField label="Experience (Years)" icon={CalendarDays}>
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
                </FormField>

                <FormField label="Listings Count" icon={Building2}>
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
                </FormField>

              </div>
            </section>

            {/* Profile image */}
            <section>
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
                  <Image size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800">
                    Profile & Biography
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Add a professional image and agent introduction.
                  </p>
                </div>
              </div>

              <div className="space-y-5">

                <FormField label="Profile Image URL" icon={Image}>
                  <input
                    name="image"
                    type="url"
                    placeholder="https://example.com/profile.jpg"
                    value={form.image}
                    onChange={handleChange}
                    disabled={loading}
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Agent Biography" icon={FileText}>
                  <textarea
                    name="bio"
                    placeholder="Write a short professional summary about the agent..."
                    rows={5}
                    value={form.bio}
                    onChange={handleChange}
                    disabled={loading}
                    className={`${inputClass} resize-none`}
                  />
                </FormField>

              </div>
            </section>

          </div>

          {/* Form actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

            <Link
              href="/admin/agents"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C5C] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b3844] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Agent...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create Agent
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}
