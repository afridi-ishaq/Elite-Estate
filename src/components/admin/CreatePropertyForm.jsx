"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePropertyForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
  });

  function handleChange(e) {
    const { name, value, type, checked } =
      e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(form);

    setLoading(true);

    const response = await fetch(
      "/api/properties",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      router.push("/admin/properties");
      router.refresh();
    }
  }
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />
      <select
        name="propertyType"
        value={form.propertyType}
        onChange={handleChange}
        className="
          w-full
          border
          border-gray-300
          rounded-xl
          p-3
        "
      >
        <option value="House">House</option>
        <option value="Villa">Villa</option>
        <option value="Apartment">Apartment</option>
        <option value="Commercial">Commercial</option>
        <option value="Plot">Plot</option>
      </select>

      <input
        name="price"
        placeholder="Price"
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <input
        name="bedrooms"
        placeholder="Bedrooms"
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <input
        name="bathrooms"
        placeholder="Bathrooms"
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

      <label className="flex gap-2">
        <input
          type="checkbox"
          name="featured"
          onChange={handleChange}
        />
        Featured Property
      </label>
      

      <button
        type="submit"
        disabled={loading}
        className="
          bg-[#0F4C5C]
          text-white
          px-6
          py-3
          rounded-xl
        "
      >
        {loading
          ? "Saving..."
          : "Save Property"}
      </button>
    </form>
  );
}