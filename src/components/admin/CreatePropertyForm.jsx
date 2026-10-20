"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-xl border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </span>
      {children}
    </label>
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
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
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
        setError(data.message || data.error || "Could not save the property.");
        return;
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Title">
        <input name="title" placeholder="e.g. Modern Villa in DHA" value={form.title} onChange={handleChange} required className={inputClass} />
      </Field>

      <Field label="Description">
        <textarea name="description" placeholder="Describe the property" rows={4} value={form.description} onChange={handleChange} required className={`${inputClass} resize-none`} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City">
          <input name="city" placeholder="e.g. Islamabad" value={form.city} onChange={handleChange} required className={inputClass} />
        </Field>

        <Field label="Property Type">
          <select name="propertyType" value={form.propertyType} onChange={handleChange} className={inputClass}>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot">Plot</option>
          </select>
        </Field>
      </div>

      <Field label="Listing Agent (shows in the agent's portfolio)">
        <select name="agentId" value={form.agentId} onChange={handleChange} className={inputClass}>
          <option value="">No agent assigned</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Price (PKR)">
          <input name="price" type="number" inputMode="numeric" min="0" placeholder="e.g. 50000000" value={form.price} onChange={handleChange} required className={inputClass} />
        </Field>

        <Field label="Bedrooms">
          <input name="bedrooms" type="number" inputMode="numeric" min="0" placeholder="0" value={form.bedrooms} onChange={handleChange} className={inputClass} />
        </Field>

        <Field label="Bathrooms">
          <input name="bathrooms" type="number" inputMode="numeric" min="0" placeholder="0" value={form.bathrooms} onChange={handleChange} className={inputClass} />
        </Field>
      </div>

      <div className="space-y-4">
        <Field label="Main Image URL">
          <input name="image" type="url" placeholder="https://..." value={form.image} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Image URL 2 (optional)">
          <input name="image2" type="url" placeholder="https://..." value={form.image2} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Image URL 3 (optional)">
          <input name="image3" type="url" placeholder="https://..." value={form.image3} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Image URL 4 (optional)">
          <input name="image4" type="url" placeholder="https://..." value={form.image4} onChange={handleChange} className={inputClass} />
        </Field>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-5 w-5 accent-[#0F4C5C]" />
        <span className="text-sm font-medium">Featured property</span>
      </label>

      {error && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#0F4C5C] px-6 py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
}