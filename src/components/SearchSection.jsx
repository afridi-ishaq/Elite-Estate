"use client";

import Container from "./Container";

export default function SearchSection() {
  return (
    <section className="-mt-20 relative z-20 pt-20">
      <Container>
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-[#1A1A1A]">
            Search Properties
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            <select className="border rounded-xl p-3 outline-none">
              <option>Select City</option>
              <option>Islamabad</option>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Peshawar</option>
            </select>

            <select className="border rounded-xl p-3 outline-none">
              <option>Budget</option>
              <option>Under 50 Lakh</option>
              <option>50 Lakh - 1 Crore</option>
              <option>1 - 2 Crore</option>
              <option>2+ Crore</option>
            </select>

            <select className="border rounded-xl p-3 outline-none">
              <option>Property Type</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Commercial</option>
            </select>

            <button className="bg-[#0F4C5C] text-white rounded-xl font-medium">
              Search
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}