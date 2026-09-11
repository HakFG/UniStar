"use client";
import React from "react";

import { motion } from "framer-motion";
import AnimatedScore from "@/components/ui/AnimatedScore";

interface UserSlim {
  id: string;
  nome: string;
  username: string;
  pontuacao: number;
  avatarUrl: string | null;
}

interface Props {
  top3: UserSlim[];
}

// Cores metalicas discretas por posicao
const PODIUM_META = [
  { label: "1º", color: "rgba(212,175,55,0.9)",  glow: "rgba(212,175,55,0.35)", bg: "rgba(212,175,55,0.12)", border: "rgba(212,175,55,0.4)", height: "h-20" },
  { label: "2º", color: "rgba(192,192,192,0.85)", glow: "rgba(192,192,192,0.25)", bg: "rgba(192,192,192,0.08)", border: "rgba(192,192,192,0.3)", height: "h-14" },
  { label: "3º", color: "rgba(176,108,51,0.85)",  glow: "rgba(176,108,51,0.25)", bg: "rgba(176,108,51,0.08)", border: "rgba(176,108,51,0.3)", height: "h-10" },
];

// Reordena para exibicao: 2º | 1º | 3º (formato podio)
const PODIUM_ORDER = [1, 0, 2];

export default function ApostasHeader({ top3 }: Props) {
  if (top3.length === 0) return null;

  const lider = top3[0];
  const segundo = top3[1];
  const diferenca = segundo ? lider.pontuacao - segundo.pontuacao : null;

  return (
    <div className="flex flex-col gap-5">
      {/* --- LIDER CARD --- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-3"
      >
        {/* Avatar com aura pulsante + coroa */}
        <div className="relative w-full max-w-[270px] aspect-[4/5] flex items-end justify-center">
          {/* Aura dourada pulsante ao redor */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[70%] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.18) 0%, transparent 70%)" }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Coroa SVG acima do avatar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-label="Lider">
              <path d="M4 24L2 6l9 8 7-12 7 12 9-8-2 18H4z"
                fill="rgba(212,175,55,0.85)" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="2" cy="6" r="2" fill="rgba(212,175,55,0.9)" />
              <circle cx="18" cy="2" r="2" fill="rgba(212,175,55,0.9)" />
              <circle cx="34" cy="6" r="2" fill="rgba(212,175,55,0.9)" />
            </svg>
          </div>

          {lider.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lider.avatarUrl}
              alt={lider.nome}
              className="w-full h-full object-contain drop-shadow-2xl select-none pointer-events-none relative z-10"
              style={{ filter: "drop-shadow(0 0 28px rgba(212,175,55,0.3)) drop-shadow(0 0 12px rgba(91,42,134,0.4))" }}
            />
          ) : (
            <div className="w-full h-full flex items-end justify-center relative z-10">
              <div
                className="w-[70%] aspect-[3/4] rounded-t-full"
                style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.4) 0%, #1B4B5A 100%)", opacity: 0.7 }}
              />
            </div>
          )}
        </div>

        {/* Card de info */}
        <div
          className="w-full rounded-2xl backdrop-blur-md px-5 py-4 text-center shadow-xl relative overflow-hidden"
          style={{
            background: "rgba(20,18,32,0.7)",
            boxShadow: "0 0 0 1px rgba(212,175,55,0.25), 0 16px 40px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.12)",
          }}
        >
          {/* Glow dourado no fundo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.1) 0%, transparent 65%)" }}
          />
          <p className="font-heading font-bold text-[10px] uppercase tracking-wider mb-0.5 relative z-10"
            style={{ color: "rgba(212,175,55,0.9)" }}>
            Lider em pontuacao
          </p>
          <p className="font-heading font-bold text-base sm:text-lg mb-3 truncate relative z-10">{lider.nome}</p>

          <p className="font-heading text-[9px] uppercase tracking-wider text-text-secondary mb-0.5 relative z-10">
            Pontos atuais
          </p>
          <AnimatedScore
            value={lider.pontuacao}
            duration={1400}
            className="font-heading font-bold text-2xl sm:text-3xl leading-none relative z-10"
            style={{ color: "rgba(212,175,55,0.95)" } as React.CSSProperties}
          />

          {/* "Lidera por X pontos" */}
          {diferenca !== null && diferenca > 0 && (
            <p className="mt-2 text-[9px] font-heading text-text-secondary relative z-10">
              Lidera por{" "}
              <span className="text-accent font-bold">{diferenca} pts</span>
            </p>
          )}
          {diferenca === 0 && (
            <p className="mt-2 text-[9px] font-heading text-text-secondary relative z-10">
              Empatado em 1º
            </p>
          )}
        </div>
      </motion.div>

      {/* --- PODIO --- */}
      {top3.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-2xl backdrop-blur-md border border-white/8 px-4 pt-4 pb-5 relative overflow-hidden"
          style={{ background: "rgba(20,18,32,0.55)" }}
        >
          <p className="text-[9px] font-heading uppercase tracking-widest text-text-secondary text-center mb-4">
            Classificacao
          </p>

          {/* Colunas do podio */}
          <div className="flex items-end justify-center gap-2">
            {PODIUM_ORDER.map((rank) => {
              const user = top3[rank];
              if (!user) return null;
              const meta = PODIUM_META[rank];
              return (
                <div key={user.id} className="flex flex-col items-center gap-1.5 flex-1">
                  {/* Nome + pontos acima da coluna */}
                  <p className="font-heading font-bold text-[9px] text-text-primary text-center leading-tight truncate w-full px-1">
                    {user.nome}
                  </p>
                  <p className="font-heading font-bold text-[10px] text-center" style={{ color: meta.color }}>
                    {user.pontuacao}
                  </p>

                  {/* Coluna do podio */}
                  <div
                    className={`w-full ${meta.height} rounded-t-lg flex items-center justify-center relative overflow-hidden`}
                    style={{ background: meta.bg, border: `1px solid ${meta.border}`, boxShadow: `0 0 16px ${meta.glow}` }}
                  >
                    <span className="font-heading font-bold text-lg" style={{ color: meta.color }}>
                      {meta.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}