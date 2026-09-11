"use client";

import type { Anime } from "@prisma/client";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  anime: Anime | null;
}

export default function ApostaAtualCard({ anime }: Props) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Label pill */}
      <div className="w-full rounded-full bg-surface backdrop-blur-md border border-white/10 px-4 py-2.5 text-center relative overflow-hidden">
        {/* Linha decorativa embaixo do titulo */}
        <h2 className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider text-text-primary relative z-10">
          Aposta Atual
        </h2>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(95,212,208,0.6), transparent)" }}
        />
      </div>

      {anime ? (
        <Link href={`/animes-da-temporada/${anime.id}`} className="group block">
          {/* Card da capa com lift + borda glow */}
          <div
            className="relative w-28 sm:w-32 aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-white/10 shadow-lg shadow-black/40 transition-all duration-400"
            style={{
              /* borda gradiente sutil */
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={anime.capaUrl}
              alt={anime.titulo}
              className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:saturate-110"
            />
            {/* Overlay glow ciano na borda no hover */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 0 1.5px rgba(95,212,208,0.55), 0 0 24px rgba(95,212,208,0.3)",
              }}
            />
            {/* Sombra elevada no hover via pseudo overlay */}
            <div className="absolute inset-0 rounded-xl group-hover:-translate-y-1 transition-transform duration-400 pointer-events-none" />
          </div>
          <p className="mt-2 text-[10px] sm:text-xs text-text-secondary truncate text-center group-hover:text-accent transition-colors duration-300 max-w-[7rem] sm:max-w-[8rem]">
            {anime.titulo}
          </p>
        </Link>
      ) : (
        /* Estado vazio com pulso na borda */
        <div className="relative w-28 sm:w-32 aspect-[3/4] rounded-xl bg-surface/30 flex items-center justify-center overflow-hidden">
          {/* Borda dashed animada */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-dashed border-white/20"
            animate={{ borderColor: ["rgba(255,255,255,0.15)", "rgba(95,212,208,0.4)", "rgba(255,255,255,0.15)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-center z-10 px-2">
            <div className="text-2xl mb-1 opacity-30">?</div>
            <span className="text-[9px] text-text-secondary/60 font-heading uppercase tracking-wider">
              Sem aposta
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}