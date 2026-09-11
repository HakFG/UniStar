"use client";

import Link from "next/link";
import type { Anime, Previsao } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import DeleteRemakeButton from "./DeleteRemakeButton";
import { motion } from "framer-motion";

const MAX_PREVISOES = 3;

interface AnimeWithPrevisoes extends Anime {
  previsoes: Previsao[];
}

interface Props {
  anime: AnimeWithPrevisoes;
  index?: number;
}

export default function RemakeCard({ anime, index = 0 }: Props) {
  const { isEditor } = useEditorMode();
  const totalPrevisoes = anime.previsoes.length;
  const completo = totalPrevisoes === MAX_PREVISOES;
  const semPrevisoes = totalPrevisoes === 0;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/continuacoes-remakes/${anime.id}`} className="flex items-center">
        {/* Capa — lift + brilho na borda + glow no hover */}
        <div
          className="relative shrink-0 w-24 h-36 sm:w-28 sm:h-40 rounded-lg overflow-hidden bg-surface border border-white/10 shadow-xl shadow-black/60 z-10 transition-all duration-400 group-hover:-translate-y-1.5"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={anime.capaUrl}
            alt={anime.titulo}
            loading="lazy"
            className="w-full h-full object-cover transition-[filter] duration-500 group-hover:brightness-110"
          />
          {/* Borda glow accent no hover */}
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 1.5px rgba(95,212,208,0.55), 0 0 20px rgba(95,212,208,0.2)" }}
          />
          {/* Sombra glow aumentada no hover */}
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
            style={{ boxShadow: "0 16px 40px rgba(95,212,208,0.2)" }}
          />
        </div>

        {/* Pill do titulo */}
        <div
          className={`relative flex-1 -ml-6 rounded-full h-12 sm:h-14 flex items-center pl-8 pr-4 transition-all duration-400 shadow-lg overflow-hidden ${
            semPrevisoes
              ? "border-2 border-dashed border-white/12 bg-surface/50 backdrop-blur-md"
              : "border border-white/10 bg-gradient-to-r from-surface via-surface/95 to-surface/70 backdrop-blur-md"
          } group-hover:border-accent/50 group-hover:shadow-[0_4px_20px_rgba(95,212,208,0.12)]`}
        >
          {/* Shimmer de luz que atravessa o pill no hover */}
          <div
            className="absolute inset-y-0 w-1/2 -left-full group-hover:left-[120%] transition-all duration-600 ease-in-out pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
            }}
          />

          {/* Titulo */}
          <span
            className={`flex-1 font-heading font-bold text-xs sm:text-sm leading-tight line-clamp-2 transition-colors duration-300 ${
              semPrevisoes ? "text-text-secondary group-hover:text-text-primary" : "text-text-primary group-hover:text-accent"
            }`}
          >
            {anime.titulo}
          </span>

          {/* Indicador de previsoes */}
          {!semPrevisoes && (
            <span
              className={`shrink-0 ml-2 rounded-full px-1.5 py-0.5 text-[8px] font-heading font-bold uppercase tracking-wider leading-none ${
                completo
                  ? "bg-accent/20 border border-accent/50 text-accent"
                  : "bg-white/8 border border-white/15 text-text-secondary"
              }`}
            >
              {completo ? "✓" : `${totalPrevisoes}/${MAX_PREVISOES}`}
            </span>
          )}
        </div>
      </Link>

      {/* Acoes Editor */}
      {isEditor && (
        <div className="absolute -top-1 right-0 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <Link
            href={`/continuacoes-remakes/${anime.id}/editar`}
            aria-label={`Editar ${anime.titulo}`}
            onClick={(e) => e.stopPropagation()}
            className="w-6 h-6 rounded-full bg-base/85 backdrop-blur-sm border border-white/10 hover:border-accent hover:shadow-[0_0_8px_rgba(95,212,208,0.35)] flex items-center justify-center text-[11px] text-text-primary hover:text-accent transition-all duration-200"
          >
            ✎
          </Link>
          <DeleteRemakeButton id={anime.id} titulo={anime.titulo} />
        </div>
      )}
    </motion.div>
  );
}