/**
 * Temporadas válidas do ano.
 */
const TEMPORADAS_VALIDAS = ["Inverno", "Primavera", "Verão", "Outono"];

/**
 * Extrai o "ano" de uma string de temporada tipo "Inverno 2026".
 */
export function getAno(temporada: string): number | null {
  const match = temporada.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Verifica se uma string parece uma temporada válida.
 */
export function ehTemporadaValida(temporada: string): boolean {
  const ano = getAno(temporada);
  if (!ano) return false;
  return TEMPORADAS_VALIDAS.some((t) => temporada.startsWith(t));
}

/**
 * Formata a temporada pra exibição (ex: "Inverno 2026").
 */
export function formatarTemporada(temporada: string): string {
  return temporada.trim();
}