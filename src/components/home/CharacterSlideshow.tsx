"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CHARACTERS = [
  { id: "c1", imageUrl: "https://files.catbox.moe/z55ssp.png", alt: "Personagem 1" },
  { id: "c2", imageUrl: "https://files.catbox.moe/phk9ky.png", alt: "Personagem 2" },
  { id: "c3", imageUrl: "https://files.catbox.moe/rf3raa.png", alt: "Personagem 3" },
  { id: "c4", imageUrl: "https://files.catbox.moe/piujee.png", alt: "Personagem 4" },
];

const SLIDE_MS = 4500;

export default function CharacterSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CHARACTERS.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const current = CHARACTERS[index];

  return (
    <div className="relative w-full aspect-[3/4] max-h-[calc(100vh-240px)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 flex items-end justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.imageUrl}
            alt={current.alt}
            className="h-full w-auto max-w-none object-contain drop-shadow-2xl select-none pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicadores logo abaixo do PNG */}
      <div className="absolute -bottom-5 left-0 right-0 flex justify-center gap-1.5 z-10">
        {CHARACTERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-1 rounded-full transition-all ${
              i === index ? "w-5 bg-accent" : "w-1 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}