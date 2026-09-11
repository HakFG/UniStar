"use client";

import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import AnimeCard from "./AnimeCard";
import AddAnimeCard from "./AddAnimeCard";

export default function AnimeGrid({ animes }: { animes: Anime[] }) {
  const { isEditor } = useEditorMode();

  // Se vazio E Modo Editor desligado → mensagem de vazio
  if (animes.length === 0 && !isEditor) {
    return (
      <div className="text-center py-16 text-text-secondary">
        <p className="mb-1">Nenhum anime cadastrado ainda.</p>
        <p className="text-sm">
          Ative o Modo Editor no topo e clique em &quot;+ Adicionar Anime&quot;.
        </p>
      </div>
    );
  }

  // Senão, mostra a grade (que pode incluir o card "+ Adicionar Anime")
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      {animes.map((a) => (
        <AnimeCard key={a.id} anime={a} />
      ))}
      {isEditor && <AddAnimeCard />}
    </div>
  );
}