"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PORTALS = [
  {
    name: "Animes da Temporada",
    href: "/animes-da-temporada",
    imageUrl: "https://files.catbox.moe/hio8cr.png",
    accentColor: "#5fd4d0",
    glowColor: "rgba(95,212,208,0.35)",
  },
  {
    name: "Continuacoes ou Remakes",
    href: "/continuacoes-remakes",
    imageUrl: "https://files.catbox.moe/4vse4j.png",
    accentColor: "#b23a6e",
    glowColor: "rgba(178,58,110,0.35)",
  },
  {
    name: "Apostas dos Donos",
    href: "/apostas",
    imageUrl: "https://files.catbox.moe/iianbu.png",
    accentColor: "#8B5CF6",
    glowColor: "rgba(91,42,134,0.45)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function NavigationPortals() {
  return (
    <motion.section
      className="grid grid-cols-3 gap-2 sm:gap-2.5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {PORTALS.map((p) => (
        <motion.div key={p.href} variants={itemVariants}>
          <Link
            href={p.href}
            className="group relative flex items-end min-h-[100px] sm:min-h-[130px]"
          >
            {/* Glow de fundo que aparece no hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${p.glowColor} 0%, transparent 70%)`,
                filter: "blur(8px)",
              }}
            />

            {/* Pill com border animada */}
            <div
              className="relative ml-auto w-[68%] rounded-full backdrop-blur-md border py-3 pl-8 pr-3 transition-all duration-400 flex items-center justify-center overflow-hidden"
              style={{
                background: "rgba(20, 18, 32, 0.6)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              {/* Highlight que corre pela borda no hover (pseudo usando div) */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${p.accentColor}40 0%, transparent 60%)`,
                }}
              />
              {/* Linha de luz (shimmer) que passa horizontalmente */}
              <div
                className="absolute inset-y-0 w-full -left-full group-hover:left-full transition-all duration-700 ease-in-out pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${p.accentColor}25 50%, transparent 100%)`,
                }}
              />

              <span
                className="font-heading font-semibold text-[10px] sm:text-xs text-text-primary group-hover:text-white transition-colors duration-300 text-center leading-tight relative z-10"
                style={{ textShadow: "0 0 0 transparent" }}
              >
                {p.name}
              </span>

              {/* Border glow no hover */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${p.accentColor}60, 0 0 12px ${p.glowColor}`,
                }}
              />
            </div>

            {/* PNG do personagem */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute -left-2 bottom-0 h-[110%] w-auto object-contain object-bottom pointer-events-none transition-all duration-500 group-hover:scale-[1.08]"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
              }}
            />
            {/* Sombra no chão do personagem */}
            <div
              className="absolute bottom-0 left-0 w-1/2 h-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at 40% 100%, ${p.glowColor} 0%, transparent 70%)`,
                filter: "blur(4px)",
              }}
            />
          </Link>
        </motion.div>
      ))}
    </motion.section>
  );
}
