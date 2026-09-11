"use client";

import { motion } from "framer-motion";
import type { Anime, Previsao } from "@prisma/client";
import PrevisoesCard from "./PrevisoesCard";

interface Previsao2 {
  username: string;
  data: string;
}

interface Props {
  remake: Anime & { previsoes: Previsao2[] };
}

const col = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

export default function RemakeDetailBlocks({ remake }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] gap-6 lg:gap-10 items-center">
      {/* Coluna 1 — Bloco do Titulo */}
      <motion.div {...col(0.08)} className="order-2 lg:order-none flex justify-center">
        <div
          className="w-full max-w-[280px] rounded-3xl backdrop-blur-md border border-white/10 px-6 py-10 text-center shadow-lg shadow-black/30 relative overflow-hidden"
          style={{ background: "rgba(20,18,32,0.65)" }}
        >
          {/* Gradiente de fundo sutil */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(95,212,208,0.07) 0%, transparent 70%)",
            }}
          />

          {remake.tituloImgUrl ? (
            <div className="relative">
              {/* Glow atras do PNG do titulo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(95,212,208,0.12) 0%, transparent 70%)",
                  filter: "blur(12px)",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={remake.tituloImgUrl}
                alt={remake.titulo}
                className="max-w-full h-auto mx-auto relative z-10 drop-shadow-lg"
              />
            </div>
          ) : (
            <div className="relative z-10">
              {/* Linha decorativa acima */}
              <div
                className="w-8 h-px mx-auto mb-4"
                style={{ background: "linear-gradient(90deg, transparent, rgba(95,212,208,0.6), transparent)" }}
              />
              <h1 className="font-heading font-bold text-2xl sm:text-3xl leading-tight tracking-wide">
                {remake.titulo}
              </h1>
              {/* Linha decorativa abaixo */}
              <div
                className="w-8 h-px mx-auto mt-4"
                style={{ background: "linear-gradient(90deg, transparent, rgba(95,212,208,0.6), transparent)" }}
              />
            </div>
          )}

          {/* Sinopse se houver */}
          {remake.sinopse && (
            <p className="mt-5 text-xs text-text-secondary leading-relaxed relative z-10">
              {remake.sinopse}
            </p>
          )}
        </div>
      </motion.div>

      {/* Coluna 2 — Capa grande (elemento dominante) */}
      <motion.div
        className="order-1 lg:order-none flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full max-w-md">
          {/* Glow atras da capa */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 90%, rgba(95,212,208,0.3) 0%, rgba(91,42,134,0.2) 50%, transparent 75%)",
              filter: "blur(24px)",
              transform: "translateY(12px) scaleX(0.85)",
            }}
          />
          {/* Anel accent ao redor da capa */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none z-20"
            style={{
              boxShadow:
                "0 0 0 1px rgba(95,212,208,0.18), 0 0 40px rgba(95,212,208,0.08)",
            }}
          />
          <div className="relative z-10 w-full aspect-[2/3] rounded-3xl overflow-hidden bg-surface border border-white/8 shadow-2xl shadow-black/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={remake.capaUrl}
              alt={remake.titulo}
              className="w-full h-full object-cover"
            />
            {/* Reflexo suave na base */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(11,13,23,0.45) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Coluna 3 — Previsoes */}
      <motion.div {...col(0.16)} className="order-3 lg:order-none flex justify-center">
        <div className="w-full max-w-[280px]">
          <PrevisoesCard previsoes={remake.previsoes} />
        </div>
      </motion.div>
    </div>
  );
}