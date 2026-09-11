"use client";

import { motion } from "framer-motion";

export default function AnimeTrailerButton({ url }: { url: string | null }) {
  if (!url) return null;

  return (
    <div className="relative">
      {/* Glow pulsante atras do botao */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: [
            "0 0 0px rgba(95,212,208,0)",
            "0 0 20px rgba(95,212,208,0.45)",
            "0 0 0px rgba(95,212,208,0)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center gap-2.5 rounded-full font-heading font-bold px-6 py-3.5 text-sm overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #5fd4d0 0%, #3ab8b4 100%)",
          color: "#0b0d17",
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        {/* Shine interno no hover */}
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)",
          }}
        />

        {/* Icone play com circulo */}
        <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black/20">
          <svg
            className="w-3 h-3 ml-0.5"
            viewBox="0 0 12 14"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 0l12 7-12 7z" />
          </svg>
        </span>

        <span className="relative">Assistir Trailer</span>
      </motion.a>
    </div>
  );
}
