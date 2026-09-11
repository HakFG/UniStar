"use client";

import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import RemakeCard from "./RemakeCard";
import AddRemakeCard from "./AddRemakeCard";

export default function RemakeGrid({ remakes }: { remakes: Anime[] }) {
  const { isEditor } = useEditorMode();

  if (remakes.length === 0 && !isEditor) {
    return (
      <div className="text-center py-16 text-text-secondary">
        <p className="mb-1">Nada cadastrado ainda.</p>
        <p className="text-sm">
          Ative o Modo Editor no topo e clique em &quot;+ Adicionar Remake&quot;.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
      {remakes.map((r) => (
        <RemakeCard key={r.id} anime={r} />
      ))}
      {isEditor && <AddRemakeCard />}
    </div>
  );
}