
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Tag,
  MapPin,
  Image as ImageIcon,
  UserRound,
  Star,
  Save,
  Loader2,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/20";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

function FormSection({ icon: Icon, title, description, children }) {
  return (
    <section>
      <div className="mb-4 border-b border-slate-200 pb-3">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
          <Icon className="h-4 w-4 text-[#0F4C5C]" />
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export default function CreatePropertyForm({ agents = [] }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    image: "",
    featured: false,
    propertyType: "House",
    image2: "",
    image3: "",
    image4: "",
    agentId: "",
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || data.error || "Could not save the property."
        );
        return;
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Back Link */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/admin/properties")}
            className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-[#0F4C5C]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </button>
        </div>

        {/* Main Form Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">

          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-[#0F4C5C] to-[#136175] px-6 py-7 text-white sm:px-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-3">
                <Building2 className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                  Create New Property
                </h1>
                <p className="mt-1 text-sm text-slate-200">
                  Add a new property listing to your real estate portfolio.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-8">

            {/* General Information */}
            <FormSection
              icon={Building2}
              title="General Information"
              description="Enter the basic information about your property."
            >
              <div className="space-y-4">
                <Field label="Property Title">
                  <input
                    name="title"
                    placeholder="e.g. Modern Luxury Villa in DHA"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Property Description">
                  <textarea
                    name="description"
                    placeholder="Provide a comprehensive description of the property..."
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    required
                    className={`${inputClass} resize-y`}
                  />
                </Field>
              </div>
            </FormSection>

            {/* Classification & Pricing */}
            <FormSection
              icon={Tag}
              title="Classification & Pricing"
              description="Specify the property category and asking price."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Property Type">
                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Plot">Plot</option>
                  </select>
                </Field>

                <Field label="Price (PKR)">
                  <input
                    name="price"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    placeholder="e.g. 50000000"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </Field>
              </div>
            </FormSection>

            {/* Location & Specifications */}
            <FormSection
              icon={MapPin}
              title="Location & Specifications"
              description="Provide location and property details."
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="City">
                  <input
                    name="city"
                    placeholder="e.g. Islamabad"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Bedrooms">
                  <input
                    name="bedrooms"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    placeholder="0"
                    value={form.bedrooms}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>

                <Field label="Bathrooms">
                  <input
                    name="bathrooms"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    placeholder="0"
                    value={form.bathrooms}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>
              </div>
            </FormSection>

            {/* Agent Assignment */}
            <FormSection
              icon={UserRound}
              title="Agent Assignment"
              description="Assign this listing to an agent's portfolio."
            >
              <Field label="Listing Agent">
                <select
                  name="agentId"
                  value={form.agentId}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">No Agent Assigned</option>

                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </Field>
            </FormSection>

            {/* Property Images */}
            <FormSection
              icon={ImageIcon}
              title="Property Images"
              description="Add image URLs for your property gallery. The first image is the primary image."
            >
              <div className="space-y-4">
                {[
                  { name: "image", label: "Main Image URL (Primary)" },
                  { name: "image2", label: "Image URL 2 (Optional)" },
                  { name: "image3", label: "Image URL 3 (Optional)" },
                  { name: "image4", label: "Image URL 4 (Optional)" },
                ].map((item) => (
                  <Field key={item.name} label={item.label}>
                    <input
                      name={item.name}
                      type="url"
                      placeholder="https://example.com/property-image.jpg"
                      value={form[item.name]}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                ))}
              </div>
            </FormSection>

            {/* Featured Property */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="mt-0.5 h-5 w-5 accent-[#0F4C5C]"
                />

                <div>
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Star className="h-4 w-4 text-[#C89B3C]" />
                    Featured Property
                  </span>
                  <p className="mt-1 text-xs text-slate-500">
                    Highlight this property in featured listings on your website.
                  </p>
                </div>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => router.push("/admin/properties")}
                disabled={loading}
                className="rounded-xl px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C5C] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0F4C5C]/20 transition-all hover:bg-[#0c3d49] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Property...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Property
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
