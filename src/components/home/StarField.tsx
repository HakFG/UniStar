"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/** PRNG determinístico — sempre gera as mesmas estrelas no mesmo lugar */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  angle: number;       // graus (25 a 45 fica bom)
  distance: number;    // quanto viaja em px
  duration: number;    // duração do disparo
  delay: number;       // atraso inicial
  repeatDelay: number; // tempo entre disparos
  length: number;      // tamanho da cauda em px
}

function generateStars(
  count: number,
  seed: number,
  sizeRange: [number, number]
): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: sizeRange[0] + rand() * (sizeRange[1] - sizeRange[0]),
    delay: rand() * 6,
    duration: 2.5 + rand() * 4,
    opacity: 0.3 + rand() * 0.6,
  }));
}

/**
 * Gera N estrelas cadentes espalhadas pela tela com trajetórias variadas.
 */
function generateShootingStars(count: number, seed: number): ShootingStar[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // Começa em posições variadas (parte superior da tela)
    top: rand() * 55,
    left: -10 + rand() * 80,
    // Ângulo entre 20° e 50° (desce pra direita)
    angle: 20 + rand() * 30,
    // Distância percorrida
    distance: 300 + rand() * 500,
    // Duração do disparo (rápido)
    duration: 0.9 + rand() * 0.8,
    // Delay inicial — bem espalhado pra não começar tudo junto
    delay: rand() * 20,
    // Intervalo entre repetições (bem variado)
    repeatDelay: 4 + rand() * 12,
    // Tamanho da cauda
    length: 80 + rand() * 120,
  }));
}

export default function StarField() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── 2x mais estrelas que antes ──
  const smallStars  = useMemo(() => generateStars(480, 42,   [0.8, 1.5]), []);
  const mediumStars = useMemo(() => generateStars(140, 1337, [1.5, 2.2]), []);
  const bigStars    = useMemo(() => generateStars(36,  7777, [2,   3  ]), []);

  // ── Muitas estrelas cadentes ──
  const shootingStars = useMemo(() => generateShootingStars(18, 9999), []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* ═══ Camada 1 — estrelas pequenas (twinkle suave) ═══ */}
      {smallStars.map((s) => (
        <motion.span
          key={`sm-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={
            reducedMotion
              ? { opacity: s.opacity * 0.6 }
              : { opacity: [s.opacity * 0.25, s.opacity, s.opacity * 0.25] }
          }
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ═══ Camada 2 — estrelas médias (twinkle + glow) ═══ */}
      {mediumStars.map((s) => (
        <motion.span
          key={`md-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px 1px rgba(255,255,255,0.5)",
          }}
          animate={
            reducedMotion
              ? { opacity: s.opacity * 0.7 }
              : {
                  opacity: [s.opacity * 0.2, s.opacity, s.opacity * 0.2],
                  scale: [1, 1.35, 1],
                }
          }
          transition={{
            duration: s.duration * 1.4,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ═══ Camada 3 — estrelas grandes (glow accent ciano) ═══ */}
      {bigStars.map((s) => (
        <motion.span
          key={`lg-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size * 1.4,
            height: s.size * 1.4,
            background: "#5FD4D0",
            boxShadow: "0 0 12px 2px rgba(95,212,208,0.7)",
          }}
          animate={
            reducedMotion
              ? { opacity: 0.6 }
              : {
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.85, 1.3, 0.85],
                }
          }
          transition={{
            duration: s.duration * 1.6,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ═══ Estrelas cadentes — MUITAS, cada uma com trajetória própria ═══ */}
      {!reducedMotion &&
        shootingStars.map((ss) => {
          const rad = (ss.angle * Math.PI) / 180;
          const endX = ss.distance * Math.cos(rad);
          const endY = ss.distance * Math.sin(rad);

          return (
            <motion.div
              key={`shoot-${ss.id}`}
              className="absolute"
              style={{
                top: `${ss.top}%`,
                left: `${ss.left}%`,
                width: ss.length,
                height: 1.5,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 100%)",
                borderRadius: 9999,
                transformOrigin: "left center",
                rotate: `${ss.angle}deg`,
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0, 1, 1, 0],
                x: [0, 0, endX * 0.4, endX * 0.8, endX],
                y: [0, 0, endY * 0.4, endY * 0.8, endY],
              }}
              transition={{
                duration: ss.duration,
                delay: ss.delay,
                repeat: Infinity,
                repeatDelay: ss.repeatDelay,
                times: [0, 0.15, 0.4, 0.75, 1],
                ease: "easeOut",
              }}
            />
          );
        })}
    </div>
  );
}