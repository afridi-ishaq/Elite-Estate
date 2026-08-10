"use client";

import Container from "./Container";
import { FaRobot } from "react-icons/fa";

export default function AIAssistant() {
  return (
    <section className="py-24">
      <Container>
        <div
          className="
            bg-[#0F4C5C]
            rounded-3xl
            p-10
            md:p-16
            text-white
          "
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <FaRobot size={28} />
              <span className="text-[#D9C7A7] font-semibold">
                AI Property Assistant
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold">
              Let AI Find Your Perfect Property
            </h2>

            <p className="mt-6 text-gray-200 text-lg">
              Tell our AI your budget, city, and property
              requirements. It will instantly suggest
              matching properties and connect you with an
              agent.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                className="
                  bg-[#C89B3C]
                  text-black
                  px-8
                  py-4
                  rounded-xl
                  font-semibold
                "
              >
                Start AI Search
              </button>

              <button
                className="
                  border
                  border-white
                  px-8
                  py-4
                  rounded-xl
                "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}