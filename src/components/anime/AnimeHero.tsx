"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Anime } from "@prisma/client";

const ROTATE_MS = 7000;

export default function AnimeHero({ animes }: { animes: Anime[] }) {
  const [index, setIndex] = useState(0);

  const destacaveis = animes.filter((a) => a.bannerUrl || a.capaUrl);

  useEffect(() => {
    if (index >= destacaveis.length) setIndex(0);
  }, [destacaveis.length, index]);

  useEffect(() => {
    if (destacaveis.length <= 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % destacaveis.length);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, [destacaveis.length]);

  if (destacaveis.length === 0) return null;

  const featured = destacaveis[index];
  const bannerSrc = featured.bannerUrl ?? featured.capaUrl;

  return (
    <div className="relative w-full h-44 sm:h-56 md:h-72 lg:h-80 rounded-2xl overflow-hidden border border-white/8 mb-6 sm:mb-8 shadow-[0_0_60px_rgba(11,13,23,0.8)]">
      {/* Banner com fade cruzado */}
      <AnimatePresence mode="sync">
        <motion.div
          key={featured.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bannerSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/65 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />
      {/* Vignette lateral direita sutil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, transparent 40%, rgba(11,13,23,0.5) 100%)",
        }}
      />

      {/* Conteudo */}
      <div className="relative h-full flex flex-col justify-end sm:justify-between p-5 sm:p-7 md:p-10">
        <div className="min-w-0 max-w-xl">
          {/* Label "Em destaque" com acento */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-px bg-accent" />
            <p className="text-accent text-[10px] sm:text-xs uppercase tracking-widest font-heading font-semibold">
              Em destaque
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={featured.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-heading font-bold text-xl sm:text-2xl md:text-4xl leading-tight drop-shadow-lg"
            >
              {featured.titulo}
            </motion.h2>
          </AnimatePresence>

          {/* Sinopse curta se disponivel */}
          {featured.sinopse && (
            <AnimatePresence mode="wait">
              <motion.p
                key={`${featured.id}-sinopse`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="mt-2 text-text-secondary text-[11px] sm:text-xs leading-relaxed line-clamp-2 max-w-sm hidden sm:block"
              >
                {featured.sinopse}
              </motion.p>
            </AnimatePresence>
          )}
        </div>

        {/* Indicadores */}
        {destacaveis.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-5 sm:left-7 md:left-10 flex gap-1.5 z-10">
            {destacaveis.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ver destaque ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-accent shadow-[0_0_6px_rgba(95,212,208,0.6)]"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Logo */}
        <div className="absolute top-4 sm:top-6 right-5 sm:right-7 md:right-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Unistar_Nick.png"
            alt="UniStar"
            className="w-20 sm:w-28 md:w-36 h-auto opacity-80 drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
