"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#0F4C5C] disabled:bg-gray-100 disabled:cursor-not-allowed";

// Config array to make form fields completely dynamic and easy to scale
const AGENT_FIELDS = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+1 (555) 000-0000" },
  { name: "title", label: "Job Title", type: "text", placeholder: "Senior Property Consultant" },
  { name: "experience", label: "Experience (Years)", type: "number", min: "0", inputMode: "numeric" },
  { name: "listings", label: "Listings Count", type: "number", min: "0", inputMode: "numeric" },
  { name: "image", label: "Profile Image URL", type: "url", placeholder: "https://...", span: "full" },
  { name: "bio", label: "Bio", type: "textarea", rows: 5, span: "full" },
];

export default function EditAgentForm({ agent }) {
  const router = useRouter();

  // Initialize form dynamically from agent props with fallback defaults
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
    const confirmed = confirm("Are you sure you want to delete this agent? This action cannot be undone.");
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
    <main className="min-h-screen bg-gray-50 px-4 pb-24 pt-20 sm:px-6 md:p-12 lg:p-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex flex-col pt-6 gap-4 sm:flex-row sm:items-start sm:justify-between md:mb-8">
          <div className="min-w-0">
            <Link
              href="/admin/agents"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Back to Agents
            </Link>

            <h1 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
              Edit Agent: {agent.name || "Agent"}
            </h1>

            <p className="mt-1 text-gray-500">Update agent profile information.</p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || loading}
            className="self-start rounded-xl bg-red-50 px-5 py-2.5 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Agent"}
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {AGENT_FIELDS.map((field) => {
              const isFullSpan = field.span === "full";
              return (
                <div key={field.name} className={isFullSpan ? "md:col-span-2" : ""}>
                  <label htmlFor={field.name} className="mb-2 block text-sm font-medium text-gray-700">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
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

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
            <Link
              href="/admin/agents"
              className="rounded-xl border border-gray-300 px-5 py-3 text-center text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading || deleting}
              className="rounded-xl bg-[#0F4C5C] px-6 py-3 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
                {/* Portfolio (read-only, assigned from each property's edit page) */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Portfolio ({(agent.properties ?? []).length})
            </h2>
            <Link
              href="/admin/properties/new"
              className="text-sm font-semibold text-[#0F4C5C] hover:underline"
            >
              + Add property
            </Link>
          </div>

          {(agent.properties ?? []).length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
              No properties assigned yet. Open a property&apos;s edit page and
              choose this agent under &quot;Assigned Agent&quot;.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {agent.properties.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">{p.title}</p>
                    <p className="truncate text-sm text-gray-500">
                      {p.city} · PKR {Number(p.price).toLocaleString()}
                    </p>
                  </div>
                  <Link
                    href={`/admin/properties/${p.id}`}
                    className="shrink-0 rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}