"use client";

import Container from "./Container";
import { motion } from "framer-motion";

const stats = [
  {
    value: "500+",
    title: "Properties Sold",
  },
  {
    value: "98%",
    title: "Client Satisfaction",
  },
  {
    value: "10+",
    title: "Years Experience",
  },
  {
    value: "50+",
    title: "Expert Agents",
  },
];

export default function StatsSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((item) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={item.title}
              className="
                bg-white
                rounded-2xl
                p-8
                text-center
                shadow-sm
              "
            >
              <h3 className="text-4xl font-bold text-[#0F4C5C]">
                {item.value}
              </h3>

              <p className="mt-3 text-gray-600">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}