"use client";

import { motion } from "framer-motion";
import Container from "./Container";
import { HousePlus } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen pb-20 pt-40 flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/realestate.jpg"
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05e335]/10 text-[#D9C7A7] border border-[#C89B3C]/30 text-sm font-medium tracking-wide shadow-sm mb-6">
            {/* Indicator Wrapper */}
            <div className="relative flex items-center justify-center w-2 h-2">
              {/* Pulsing Ripple Effect */}
              <motion.div
                className="absolute w-full h-full rounded-full bg-emerald-400"
                animate={{
                  scale: [1, 3],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut", // Smoother for pulse rings
                }}
              />
              {/* Solid Center Dot */}
              <div className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            </div>

            {/* Text */}
            Pakistan's Premium Real Estate Platform
          </span>


          <h1
            className="
              text-5xl
              md:text-7xl
              font-bold
              text-white
              leading-tight
            "
          >
            Find Your
            <span className="text-[#C89B3C]">
              {" "}Dream Property
            </span>
          </h1>

          <p
            className="
              text-lg
              md:text-xl
              text-gray-200
              mt-6
              max-w-2xl
            "
          >
            Discover luxury homes, premium apartments,
            commercial spaces, and investment opportunities
            across Pakistan.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button className="
                group relative flex items-center justify-between overflow-hidden 
                py-1.5 pl-8 pr-1.5 rounded-[30px] border border-[#0F4C5C] 
                font-semibold text-[#0F4C5C] transition-colors duration-400 ease-out
                hover:text-white
                ">
              {/* Background slide animation layer (Slides Right-to-Left) */}
              <span className="
                    absolute inset-0 -z-10 translate-x-full bg-[#0F4C5C] 
                    transition-transform duration-400 ease-out 
                    group-hover:translate-x-0
                " />

              {/* Button Text */}
              <span className="whitespace-nowrap pr-6 text-white select-none">
                Browse Properties
              </span>

              {/* Circular Icon Wrapper */}
              <span className="
                    flex items-center justify-center 
                    w-9 h-9 rounded-full 
                    bg-[#0F4C5C] text-white 
                    transition-all duration-400 ease-out
                    group-hover:bg-white group-hover:text-[#0F4C5C]
                ">
                <HousePlus
                  size={18}
                  className="transform transition-transform duration-300 group-hover:scale-110"
                />
              </span>
            </button>

            <button
              className="
                border
                border-white
                text-white
                px-8
                py-3
                rounded-full
                hover:bg-white
                hover:text-black
                transition
              "
            >
              Contact Agent
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}