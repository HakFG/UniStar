/**
 * O Next.js implementa redirect() lançando um erro interno com um digest
 * especial (NEXT_REDIRECT). Quando a gente faz try/catch em torno de uma
 * server action, precisamos re-lançar esse erro pro Next cuidar da navegação.
 */
export function isRedirectError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const digest = (err as { digest?: string }).digest;
  return typeof digest === "string" && digest.startsWith("NEXT_REDIRECT");
}