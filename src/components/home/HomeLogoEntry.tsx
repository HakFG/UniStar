"use client";

import { motion } from "framer-motion";

export default function HomeLogoEntry() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Glow sutil atras do logo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 120% at 30% 50%, rgba(91,42,134,0.25) 0%, transparent 70%)",
          filter: "blur(16px)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Unistar_Nick.png"
        alt="UniStar"
        className="logo-shimmer-text w-44 sm:w-52 lg:w-60 h-auto object-contain relative z-10"
      />
    </motion.div>
  );
}
