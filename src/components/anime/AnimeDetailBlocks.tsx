"use client";

import { motion } from "framer-motion";
import type { Anime } from "@prisma/client";
import AnimeStaffCard from "./AnimeStaffCard";
import AnimeNotesCard from "./AnimeNotesCard";
import AnimeTrailerButton from "./AnimeTrailerButton";

const col = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function AnimeDetailBlocks({ anime }: { anime: Anime }) {
  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.2fr_1.5fr_1.2fr] lg:gap-8 lg:items-start">
      {/* Coluna 1 — Titulo + Sinopse */}
      <motion.div {...col(0.05)} className="order-2 lg:order-none flex flex-col gap-5">
        {/* Titulo */}
        <div>
          {anime.tituloImgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={anime.tituloImgUrl} alt={anime.titulo} className="max-w-full h-auto drop-shadow-lg" />
          ) : (
            <h1 className="font-heading font-bold text-2xl sm:text-3xl leading-tight">
              {anime.titulo}
            </h1>
          )}
          {/* Linha decorativa abaixo do titulo */}
          <div
            className="mt-3 h-px w-16"
            style={{ background: "linear-gradient(90deg, rgba(95,212,208,0.6) 0%, transparent 100%)" }}
          />
        </div>

        {/* Temporada badge */}
        {anime.temporada && (
          <span className="self-start rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-[10px] font-heading font-semibold text-accent uppercase tracking-wider">
            {anime.temporada}
          </span>
        )}

        {/* Sinopse */}
        {anime.sinopse && (
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/30 relative">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(160deg, rgba(27,75,90,0.15) 0%, transparent 70%)",
              }}
            />
            <div className="relative bg-surface/80 backdrop-blur-md p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full bg-gradient-to-b from-aurora-teal to-accent shrink-0" />
                <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-text-secondary">
                  Sinopse
                </h3>
              </div>
              <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                {anime.sinopse}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Coluna 2 — Capa */}
      <motion.div {...col(0)} className="order-1 lg:order-none">
        <div className="relative w-full max-w-md mx-auto">
          {/* Glow atras da capa */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 90%, rgba(91,42,134,0.5) 0%, transparent 70%)",
              filter: "blur(20px)",
              transform: "translateY(8px) scaleX(0.9)",
            }}
          />
          <div className="relative z-10 w-full aspect-[3/4] rounded-2xl overflow-hidden bg-surface border border-white/8 shadow-2xl shadow-black/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={anime.capaUrl}
              alt={anime.titulo}
              className="w-full h-full object-cover"
            />
            {/* Reflexo sutil na base */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(11,13,23,0.5) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Coluna 3 — Trailer + Staff + Notas */}
      <motion.div {...col(0.12)} className="order-3 lg:order-none flex flex-col gap-5">
        <AnimeTrailerButton url={anime.trailerUrl} />
        <AnimeStaffCard anime={anime} />
        <AnimeNotesCard notas={anime.notasNandao} />
      </motion.div>
    </div>
  );
}