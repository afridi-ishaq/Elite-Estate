"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD_SOURCES, SOURCE_LABELS } from "@/lib/lead-constants";

const inputClass = "w-full border border-gray-300 rounded-xl p-3";

export default function AddLeadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    budget: "",
    propertyType: "",
    source: "MANUAL",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      router.push("/admin/leads");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not create lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className={inputClass} />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputClass} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className={inputClass} />
      <input name="city" placeholder="City (e.g. DHA Islamabad)" value={form.city} onChange={handleChange} className={inputClass} />
      <input type="number" name="budget" placeholder="Budget (PKR)" value={form.budget} onChange={handleChange} className={inputClass} />
      <input name="propertyType" placeholder="Property type (Villa, Apartment...)" value={form.propertyType} onChange={handleChange} className={inputClass} />

      <select name="source" value={form.source} onChange={handleChange} className={inputClass}>
        {LEAD_SOURCES.map((s) => (
          <option key={s} value={s}>{SOURCE_LABELS[s]}</option>
        ))}
      </select>

      <textarea name="message" placeholder="Message / requirements" rows="4" value={form.message} onChange={handleChange} className={inputClass} />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0F4C5C] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
        style={{ color: "white" }}
      >
        {loading ? "Saving..." : "Create Lead"}
      </button>
    </form>
  );
}