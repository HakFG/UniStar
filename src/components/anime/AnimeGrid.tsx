"use client";

import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import AnimeCard from "./AnimeCard";
import AddAnimeCard from "./AddAnimeCard";

export default function AnimeGrid({ animes }: { animes: Anime[] }) {
  const { isEditor } = useEditorMode();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      {animes.map((a) => (
        <AnimeCard key={a.id} anime={a} />
      ))}
      {isEditor && <AddAnimeCard />}
    </div>
  );
}