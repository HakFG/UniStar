"use client";

import Link from "next/link";
import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import DeleteAnimeButton from "./DeleteAnimeButton";

export default function AnimeCard({ anime }: { anime: Anime }) {
  const { isEditor } = useEditorMode();

  return (
    <div className="group relative">
      <Link
        href={`/animes-da-temporada/${anime.id}`}
        className="block"
      >
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-white/5 shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-[1.02]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={anime.capaUrl}
            alt={anime.titulo}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-2 text-xs sm:text-sm text-text-secondary truncate text-center">
          {anime.titulo}
        </p>
      </Link>

      {/* Ações — só com Modo Editor */}
      {isEditor && (
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/animes-da-temporada/${anime.id}/editar`}
            aria-label="Editar"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-full bg-base/85 backdrop-blur-sm border border-white/10 hover:border-accent flex items-center justify-center text-sm text-text-primary hover:text-accent transition-colors"
          >
            ✎
          </Link>
          <DeleteAnimeButton id={anime.id} titulo={anime.titulo} />
        </div>
      )}
    </div>
  );
}