
"use client";

import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  budget: "",
  message: "",
  website: "",
};

const budgetOptions = [
  "Under PKR 50 lakh",
  "PKR 50 lakh – 1 crore",
  "PKR 1 – 2 crore",
  "PKR 2 – 5 crore",
  "PKR 5 – 10 crore",
  "PKR 10 – 20 crore",
  "Above PKR 20 crore",
  "Not decided yet",
];

export default function InquiryForm() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSuccess("Inquiry submitted successfully!");
      setForm(emptyForm);
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">
      <h3 className="text-2xl font-bold mb-2">
        Request Information
      </h3>

      <p className="text-gray-500 text-sm mb-6">
        Tell us what you're looking for and our team will help you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#0F4C5C] focus:ring-1 focus:ring-[#0F4C5C]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#0F4C5C] focus:ring-1 focus:ring-[#0F4C5C]"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#0F4C5C] focus:ring-1 focus:ring-[#0F4C5C]"
        />

        {/* Budget */}
        <select
          name="budget"
          value={form.budget}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 bg-white text-gray-600 outline-none focus:border-[#0F4C5C] focus:ring-1 focus:ring-[#0F4C5C]"
        >
          <option value="">Select Your Budget (Optional)</option>

          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          placeholder="Tell us about the property you're looking for..."
          rows="5"
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#0F4C5C] focus:ring-1 focus:ring-[#0F4C5C]"
        />

        {/* Hidden spam trap */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px" }}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0F4C5C] hover:bg-[#0b3844] text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>

        {success && (
          <p className="text-green-600 text-center">
            {success}
          </p>
        )}
      </form>
    </div>
  );
}
