"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { calcularLevel, progressoLevel, corDoLevel } from "@/lib/levels";

interface Props {
  pontuacao: number;
}

/** Cor do anel SVG conforme faixa do level */
function ringColor(level: number): string {
  if (level <= 2) return "#a9a6b8";
  if (level <= 4) return "#5fd4d0";
  if (level <= 6) return "#5B2A86";
  return "#B23A6E";
}

function ringGlow(level: number): string {
  if (level <= 2) return "rgba(169,166,184,0.4)";
  if (level <= 4) return "rgba(95,212,208,0.5)";
  if (level <= 6) return "rgba(91,42,134,0.55)";
  return "rgba(178,58,110,0.55)";
}

const RADIUS = 52; // raio do circulo SVG
const CIRCUNFERENCIA = 2 * Math.PI * RADIUS;

export default function PontuacaoCard({ pontuacao }: Props) {
  const level = calcularLevel(pontuacao);
  const { pct } = progressoLevel(pontuacao);
  const cor = ringColor(level);
  const glow = ringGlow(level);

  // Count-up ao entrar na viewport
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const displayed = useCountUp(inView ? pontuacao : 0, 1300);

  // Progresso animado do anel (0 -> pct%)
  const [ringPct, setRingPct] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!reduced) {
            // Anel sobe de 0 ate pct durante 1.3s
            const start = performance.now();
            const duration = 1300;
            const animate = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - t, 3);
              setRingPct(ease * pct);
              if (t < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          } else {
            setRingPct(pct);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pct]);

  const dashOffset = CIRCUNFERENCIA - (ringPct / 100) * CIRCUNFERENCIA;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Label pill */}
      <div className="w-full rounded-full bg-surface backdrop-blur-md border border-white/10 px-4 py-2.5 text-center">
        <h2 className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider text-text-primary">
          Pontuacao
        </h2>
      </div>

      {/* Circulo com anel SVG de progresso */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
        {/* SVG do anel */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          {/* Trilha de fundo do anel */}
          <circle
            cx="60" cy="60"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="6"
          />
          {/* Anel de progresso */}
          <circle
            cx="60" cy="60"
            r={RADIUS}
            fill="none"
            stroke={cor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUNFERENCIA}
            strokeDashoffset={dashOffset}
            style={{
              filter: pontuacao > 0 ? `drop-shadow(0 0 6px ${glow})` : undefined,
              transition: "stroke-dashoffset 0.05s linear",
            }}
          />
        </svg>

        {/* Circulo interno */}
        <div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "rgba(20,18,32,0.75)",
            boxShadow: pontuacao > 0
              ? `0 0 0 1px rgba(255,255,255,0.08), 0 0 20px ${glow}`
              : "0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          {/* Glow interno */}
          {pontuacao > 0 && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 50%, ${glow} 0%, transparent 70%)` }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span
            className={`font-heading font-bold text-2xl sm:text-3xl leading-none relative z-10 ${corDoLevel(level)}`}
          >
            {displayed}
          </span>
          <span className="font-heading font-bold text-[9px] sm:text-[10px] uppercase tracking-wider text-text-secondary mt-1 relative z-10">
            Pontos
          </span>
        </div>
      </div>

      {/* Progresso ate o proximo LV */}
      <p className="text-[9px] font-heading uppercase tracking-wider text-text-secondary text-center">
        LV {level} · {Math.round(pct)}% pro LV {level + 1}
      </p>
    </motion.div>
  );
}