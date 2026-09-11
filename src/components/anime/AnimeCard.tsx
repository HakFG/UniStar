"use client";

import Link from "next/link";
import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import DeleteAnimeButton from "./DeleteAnimeButton";
import { motion } from "framer-motion";

interface Props {
  anime: Anime;
  index?: number;
}

export default function AnimeCard({ anime, index = 0 }: Props) {
  const { isEditor } = useEditorMode();

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.055,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/animes-da-temporada/${anime.id}`} className="block">
        {/* Container da capa — sem zoom, com lift + shine */}
        <div className="card-shine-wrapper relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-white/5 shadow-lg shadow-black/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_12px_36px_rgba(91,42,134,0.5),0_0_0_1px_rgba(95,212,208,0.12)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={anime.capaUrl}
            alt={anime.titulo}
            loading="lazy"
            className="w-full h-full object-cover transition-[filter] duration-500 group-hover:brightness-105"
          />

          {/* Overlay Netflix: aparece no hover com título */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-2.5 sm:p-3">
            <p className="font-heading font-bold text-[10px] sm:text-xs text-white leading-snug line-clamp-3 drop-shadow-lg">
              {anime.titulo}
            </p>
          </div>

          {/* Badge "Atual" discreta */}
          {anime.temporada && (
            <div className="absolute top-2 left-2 z-10">
              <span className="rounded-full bg-base/70 backdrop-blur-sm border border-accent/30 px-1.5 py-0.5 text-[8px] font-heading font-semibold text-accent uppercase tracking-wider leading-none">
                {anime.temporada.split(" ")[0]}
              </span>
            </div>
          )}
        </div>

        {/* Título abaixo — desaparece no hover pois está no overlay */}
        <p className="mt-2 text-xs sm:text-sm text-text-secondary truncate text-center group-hover:text-accent transition-colors duration-300">
          {anime.titulo}
        </p>
      </Link>

      {/* Acoes — so com Modo Editor */}
      {isEditor && (
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
          <Link
            href={`/animes-da-temporada/${anime.id}/editar`}
            aria-label="Editar"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-full bg-base/85 backdrop-blur-sm border border-white/10 hover:border-accent hover:shadow-[0_0_10px_rgba(95,212,208,0.4)] flex items-center justify-center text-sm text-text-primary hover:text-accent transition-all duration-200"
          >
            ✎
          </Link>
          <DeleteAnimeButton id={anime.id} titulo={anime.titulo} />
        </div>
      )}
    </motion.div>
  );
}
