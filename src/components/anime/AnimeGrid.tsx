"use client";

import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import AnimeCard from "./AnimeCard";
import AddAnimeCard from "./AddAnimeCard";
import { CURRENT_SEASON } from "@/lib/constants";
import { motion } from "framer-motion";

interface Props {
  grupos: [string, Anime[]][];
}

export default function AnimeGrid({ grupos }: Props) {
  const { isEditor } = useEditorMode();

  // Sem nenhum anime
  if (grupos.length === 0 && !isEditor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 text-text-secondary"
      >
        <p className="mb-1">Nenhum anime cadastrado ainda.</p>
        <p className="text-sm">
          Ative o Modo Editor no topo e clique em &quot;+ Adicionar Anime&quot;.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {grupos.map(([temporada, animes]) => {
        const isAtual = temporada === CURRENT_SEASON;
        return (
          <section key={temporada}>
            {/* Header da temporada */}
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-heading font-bold text-lg sm:text-xl md:text-2xl">
                {temporada}
              </h2>
              {isAtual && (
                <span className="shrink-0 rounded-full bg-accent/15 border border-accent/40 px-2 py-0.5 text-[9px] font-heading font-semibold text-accent uppercase tracking-wider">
                  Atual
                </span>
              )}
              {/* Linha decorativa */}
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(95,212,208,0.35) 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Grid com cards escalonados (index passa pro AnimeCard) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {animes.map((a, idx) => (
                <AnimeCard key={a.id} anime={a} index={idx} />
              ))}
              {isEditor && isAtual && <AddAnimeCard />}
            </div>
          </section>
        );
      })}

      {/* Editor sem secao atual */}
      {isEditor && !grupos.some(([t]) => t === CURRENT_SEASON) && (
        <section>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-heading font-bold text-lg sm:text-xl md:text-2xl">
              {CURRENT_SEASON}
            </h2>
            <span className="shrink-0 rounded-full bg-accent/15 border border-accent/40 px-2 py-0.5 text-[9px] font-heading font-semibold text-accent uppercase tracking-wider">
              Atual
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(95,212,208,0.35) 0%, transparent 100%)",
              }}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            <AddAnimeCard />
          </div>
        </section>
      )}
    </div>
  );
}
