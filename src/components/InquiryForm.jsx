"use client";

import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "", // hidden spam trap, real visitors never fill it
};

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
        throw new Error(data.error);
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
      <h3 className="text-2xl font-bold mb-6">Request Information</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl p-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl p-3"
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3"
        />

        {/* Hidden spam trap: bots fill it, humans never see it */}
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
          className="w-full bg-[#0F4C5C] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>

        {success && (
          <p className="text-green-600 text-center">{success}</p>
        )}
      </form>
    </div>
  );
}