"use client";

import { useEffect, useState, useRef } from "react";
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
  const [isReduced, setIsReduced] = useState(false);
  const prevIndex = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mq.matches);
    if (mq.matches) return;
    const id = setInterval(() => {
      prevIndex.current = index;
      setIndex((i) => (i + 1) % CHARACTERS.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [index]);

  const current = CHARACTERS[index];

  const variants = {
    enter: {
      opacity: 0,
      x: isReduced ? 0 : 50,
      scale: isReduced ? 1 : 0.96,
      filter: isReduced ? "blur(0px)" : "blur(6px)",
    },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      x: isReduced ? 0 : -40,
      scale: isReduced ? 1 : 0.97,
      filter: isReduced ? "blur(0px)" : "blur(4px)",
    },
  };

  return (
    <div className="relative w-full aspect-[3/4] max-h-[calc(100vh-240px)]">
      {/* Glow pulsante atmosférico atrás do personagem */}
      <div
        className="glow-pulse absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 80%, rgba(91,42,134,0.55) 0%, rgba(178,58,110,0.18) 55%, transparent 80%)",
          filter: "blur(18px)",
        }}
      />
      {/* Segundo glow: highlight ciano suave no topo */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(95,212,208,0.10) 0%, transparent 80%)",
          filter: "blur(12px)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-end justify-center z-10"
        >
          {/* Reflexo/sombra no rodapé do personagem */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(91,42,134,0.4) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.imageUrl}
            alt={current.alt}
            className="h-full w-auto max-w-none object-contain drop-shadow-2xl select-none pointer-events-none relative z-10"
            style={{ filter: "drop-shadow(0 0 20px rgba(91,42,134,0.4))" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicadores */}
      <div className="absolute -bottom-5 left-0 right-0 flex justify-center gap-1.5 z-20">
        {CHARACTERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index
                ? "w-5 bg-accent shadow-[0_0_6px_1px_rgba(95,212,208,0.6)]"
                : "w-1 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
