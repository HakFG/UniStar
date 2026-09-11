"use client";

import Link from "next/link";
import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import DeleteRemakeButton from "./DeleteRemakeButton";

export default function RemakeCard({ anime }: { anime: Anime }) {
  const { isEditor } = useEditorMode();

  return (
    <div className="group relative">
      <Link
        href={`/continuacoes-remakes/${anime.id}`}
        className="flex items-center"
      >
        {/* Capa — grande, proporção retrato (2:3) */}
        <div className="relative shrink-0 w-24 h-36 sm:w-28 sm:h-40 rounded-lg overflow-hidden bg-surface border border-white/10 shadow-xl shadow-black/60 z-10 transition-transform duration-300 group-hover:scale-[1.04]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={anime.capaUrl}
            alt={anime.titulo}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pill fino e comprido */}
        <div className="flex-1 -ml-6 rounded-full bg-gradient-to-r from-surface via-surface/95 to-surface/70 backdrop-blur-md border border-white/10 group-hover:border-accent/60 h-12 sm:h-14 flex items-center justify-center pl-8 pr-5 transition-all duration-300 shadow-lg shadow-black/30 group-hover:shadow-accent/10">
          <span className="font-heading font-bold text-xs sm:text-sm text-text-primary group-hover:text-accent transition-colors leading-tight line-clamp-1 text-center">
            {anime.titulo}
          </span>
        </div>
      </Link>

      {/* Ações do Modo Editor */}
      {isEditor && (
        <div className="absolute -top-1 right-0 flex gap-1 z-20">
          <Link
            href={`/continuacoes-remakes/${anime.id}/editar`}
            aria-label={`Editar ${anime.titulo}`}
            onClick={(e) => e.stopPropagation()}
            className="w-6 h-6 rounded-full bg-base/85 backdrop-blur-sm border border-white/10 hover:border-accent flex items-center justify-center text-[11px] text-text-primary hover:text-accent transition-colors"
          >
            ✎
          </Link>
          <DeleteRemakeButton id={anime.id} titulo={anime.titulo} />
        </div>
      )}
    </div>
  );
}