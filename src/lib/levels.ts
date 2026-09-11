/**
 * Sistema de levels do UniStar.
 * LV 1: 0-99 pts · LV 2: 100-199 · LV 3: 200-299 · etc.
 */
export function calcularLevel(pontos: number): number {
  return Math.floor(pontos / 100) + 1;
}

export function progressoLevel(pontos: number): {
  atual: number;
  total: number;
  pct: number;
} {
  const level = calcularLevel(pontos);
  const base = (level - 1) * 100;
  const atual = pontos - base;
  return { atual, total: 100, pct: (atual / 100) * 100 };
}

export function corDoLevel(level: number): string {
  if (level <= 2) return "text-text-secondary";
  if (level <= 4) return "text-accent";
  if (level <= 6) return "text-aurora-purple";
  return "text-aurora-magenta";
}