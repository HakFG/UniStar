"use client";

import { useEffect, useState } from "react";
import type { Anime } from "@prisma/client";
import CoverCarouselItem from "./CoverCarouselItem";
import { CURRENT_SEASON } from "@/lib/constants";

const GROUP_SIZE = 3;
const ROTATE_MS = 6000;

export default function SeasonHighlight({ animes }: { animes: Anime[] }) {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (animes.length <= GROUP_SIZE) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => {
      setStartIndex((i) => (i + GROUP_SIZE) % animes.length);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, [animes.length]);

  // Pega até 3 animes em loop circular
  const visible = Array.from(
    { length: Math.min(GROUP_SIZE, animes.length) },
    (_, k) => animes[(startIndex + k) % animes.length]
  );

  return (
    <section>
      <h2 className="font-heading font-bold text-lg sm:text-xl md:text-2xl mb-0.5 text-text-primary leading-none">
        {CURRENT_SEASON}
      </h2>
      <p className="text-text-secondary text-[10px] sm:text-[11px] mb-2.5">
        Destaques da temporada atual
      </p>

      {animes.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-white/10 bg-surface/30 py-12 text-center">
          <p className="text-text-secondary text-sm">
            Nenhum anime cadastrado nesta temporada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {visible.map((a) => (
            <CoverCarouselItem
              key={a.id}
              title={a.titulo}
              coverUrl={a.capaUrl}
              href={`/animes-da-temporada/${a.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}