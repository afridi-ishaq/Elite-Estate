
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
  Trash2,
  Loader2,
  Home,
  MapPin,
  Pencil,
  AlertTriangle,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0F4C5C] focus:ring-4 focus:ring-[#0F4C5C]/10 disabled:cursor-not-allowed disabled:bg-slate-100";

const AGENT_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true, icon: User },
  { name: "email", label: "Email Address", type: "email", required: true, icon: Mail },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000", icon: Phone },
  { name: "title", label: "Job Title", type: "text", placeholder: "Senior Property Consultant", icon: BriefcaseBusiness },
  { name: "experience", label: "Experience (Years)", type: "number", min: "0", inputMode: "numeric", icon: CalendarDays },
  { name: "listings", label: "Listings Count", type: "number", min: "0", inputMode: "numeric", icon: Building2 },
  { name: "image", label: "Profile Image URL", type: "url", placeholder: "https://...", span: "full", icon: Image },
  { name: "bio", label: "Professional Biography", type: "textarea", rows: 5, span: "full", icon: FileText },
];

function FormSection({ icon: Icon, title, description, children }) {
  return (
    <section>
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
          <Icon size={20} />
        </div>

        <div>
          <h2 className="font-bold text-slate-800">{title}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

export default function EditAgentForm({ agent }) {
  const router = useRouter();

  const [form, setForm] = useState(() =>
    AGENT_FIELDS.reduce((acc, field) => {
      acc[field.name] = agent?.[field.name] ?? "";
      return acc;
    }, {})
  );

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    const confirmed = confirm(
      "Are you sure you want to delete this agent? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);

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
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
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
              Edit Agent
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Update professional information and manage this agent's portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || loading}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Trash2 size={17} />
            )}
            {deleting ? "Deleting..." : "Delete Agent"}
          </button>
        </div>

        {/* Agent form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Form header */}
          <div className="bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-6 py-7 text-white sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <Pencil size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  {agent.name || "Agent Profile"}
                </h2>
                <p className="mt-1 text-sm text-white/75">
                  Edit agent profile information and professional details.
                </p>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-10 p-6 sm:p-8">

            <FormSection
              icon={User}
              title="Personal & Professional Information"
              description="Update the agent's contact details and professional profile."
            >
              <div className="grid gap-5 md:grid-cols-2">
                {AGENT_FIELDS.map((field) => {
                  const Icon = field.icon;
                  const isFullSpan = field.span === "full";

                  return (
                    <div
                      key={field.name}
                      className={isFullSpan ? "md:col-span-2" : ""}
                    >
                      <label
                        htmlFor={field.name}
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
                      >
                        <Icon size={16} className="text-[#0F4C5C]" />
                        {field.label}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          rows={field.rows || 4}
                          disabled={loading || deleting}
                          placeholder={field.placeholder}
                          className={`${inputClass} resize-none`}
                        />
                      ) : (
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          value={form[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          min={field.min}
                          inputMode={field.inputMode}
                          placeholder={field.placeholder}
                          disabled={loading || deleting}
                          className={inputClass}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </FormSection>

          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
            <Link
              href="/admin/agents"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading || deleting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C5C] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b3844] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>

        {/* Portfolio */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
                <Building2 size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Property Portfolio
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  {(agent.properties ?? []).length} assigned properties
                </p>
              </div>
            </div>

            <Link
              href="/admin/properties/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C5C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b3844]"
            >
              <Home size={16} />
              Add Property
            </Link>
          </div>

          <div className="p-6 sm:p-8">
            {(agent.properties ?? []).length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                  <AlertTriangle size={22} />
                </div>

                <h3 className="font-semibold text-slate-700">
                  No Properties Assigned
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  This agent doesn't have any assigned properties yet.
                  Open a property's edit page and choose this agent under
                  Assigned Agent.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {agent.properties.map((p) => (
                  <li
                    key={p.id}
                    className="flex flex-col justify-between gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F4C5C]/10 text-[#0F4C5C]">
                        <Home size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-800">
                          {p.title}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={13} />
                            {p.city}
                          </span>

                          <span>
                            PKR {Number(p.price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/admin/properties/${p.id}`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#0F4C5C] hover:text-[#0F4C5C]"
                    >
                      <Pencil size={14} />
                      Edit Property
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
