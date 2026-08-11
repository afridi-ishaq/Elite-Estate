"use client";

export default function InquiryForm() {
  return (
    <div
      className="
        bg-white
        p-8
        rounded-3xl
        shadow-sm
      "
    >
      <h3 className="text-2xl font-bold">
        Request Information
      </h3>

      <form className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="
            w-full
            border
            rounded-xl
            p-4
          "
        />

        <input
          type="email"
          placeholder="Email"
          className="
            w-full
            border
            rounded-xl
            p-4
          "
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="
            w-full
            border
            rounded-xl
            p-4
          "
        />

        <textarea
          rows="4"
          placeholder="Message"
          className="
            w-full
            border
            rounded-xl
            p-4
          "
        />

        <button
          className="
            w-full
            bg-[#0F4C5C]
            text-white
            py-4
            rounded-xl
          "
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}