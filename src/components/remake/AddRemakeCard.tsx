"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AddRemakeCard() {
  return (
    <Link href="/continuacoes-remakes/novo" className="group flex items-center">
      <div className="flex-1 rounded-full border-2 border-dashed border-white/15 bg-surface/40 backdrop-blur-sm h-12 sm:h-14 flex items-center justify-center gap-2.5 px-4 transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-[0_0_16px_rgba(95,212,208,0.15)] group-hover:bg-surface/60">
        {/* Icone + com pulso animado */}
        <motion.span
          className="w-6 h-6 rounded-full border border-white/20 group-hover:border-accent/60 flex items-center justify-center text-base text-text-secondary group-hover:text-accent shrink-0 transition-all duration-300"
          animate={{ boxShadow: ["0 0 0px rgba(95,212,208,0)", "0 0 8px rgba(95,212,208,0.35)", "0 0 0px rgba(95,212,208,0)"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          +
        </motion.span>
        <span className="font-heading font-semibold text-xs text-text-secondary group-hover:text-accent transition-colors duration-300">
          Adicionar
        </span>
      </div>
    </Link>
  );
}