"use client";

import { useState } from "react";

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

setForm({
  name: "",
  email: "",
  phone: "",
  message: "",
});
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-md">
      <h3 className="text-2xl font-bold mb-6">
        Request Information
      </h3>

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

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-[#0F4C5C]
            text-white
            py-3
            rounded-xl
            font-semibold
          "
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