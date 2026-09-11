import { prisma } from "./prisma";
import { cache } from "react";

/**
 * Retorna o nome da temporada atual ("Inverno 2026", etc).
 * Usa React cache pra não bater no banco múltiplas vezes por request.
 */
export const getTemporadaAtual = cache(async (): Promise<string> => {
  const t = await prisma.temporada.findFirst({
    where: { isAtual: true },
    select: { nome: true },
  });
  return t?.nome ?? "Inverno 2026";
});

/**
 * Retorna todas as temporadas ordenadas por ordem (mais recente primeiro).
 */
export async function getTodasTemporadas() {
  return prisma.temporada.findMany({
    orderBy: { ordem: "desc" },
  });
}

/**
 * Extrai o ano de uma string de temporada tipo "Inverno 2026".
 */
export function getAno(temporada: string): number | null {
  const match = temporada.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Formata o nome da temporada pra exibição.
 */
export function formatarTemporada(temporada: string): string {
  return temporada.trim();
}