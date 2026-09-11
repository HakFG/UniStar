"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Anime } from "@prisma/client";

const ROTATE_MS = 6000;

export default function AnimeHero({ animes }: { animes: Anime[] }) {
  const [index, setIndex] = useState(0);

  // Se um anime for excluído e o index ficar fora do range, reseta
  useEffect(() => {
    if (index >= animes.length) setIndex(0);
  }, [animes.length, index]);

  // Rotação automática — só roda se tiver mais de 1 anime
  useEffect(() => {
    if (animes.length <= 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % animes.length);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, [animes.length]);

  // Sem animes → não renderiza nada (fica em branco)
  if (animes.length === 0) return null;

  const featured = animes[index];

  return (
    <div className="relative w-full h-36 sm:h-44 md:h-52 rounded-2xl overflow-hidden border border-white/5 mb-6 sm:mb-8">
      {/* Camada de fundo — capa rotacionando com fade cruzado */}
      <AnimatePresence mode="sync">
        <motion.div
          key={featured.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.capaUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradiente pra escurecer e dar contraste ao texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/60 to-base/20" />

      {/* Conteúdo por cima */}
      <div className="relative h-full flex items-center justify-between gap-4 px-6 sm:px-10">
        <div className="min-w-0">
          <p className="text-text-secondary text-[10px] sm:text-xs uppercase tracking-wider mb-1">
            Em destaque
          </p>

          {/* Título rotacionando com fade + slide vertical */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={featured.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-heading font-bold text-xl sm:text-2xl md:text-3xl truncate"
            >
              {featured.titulo}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-none">
            Uni<span className="text-accent">Star</span>
          </p>
        </div>
      </div>

      {/* Indicadores discretos no canto inferior esquerdo */}
      {animes.length > 1 && (
        <div className="absolute bottom-3 left-6 sm:left-10 flex gap-1.5 z-10">
          {animes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ver destaque ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === index
                  ? "w-5 bg-accent"
                  : "w-1 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}