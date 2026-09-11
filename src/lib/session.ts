import { auth } from "./auth";
import { prisma } from "./prisma";

/**
 * Retorna o usuário completo do banco, baseado na sessão ativa.
 * Se não houver sessão, lança erro.
 */
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.username) {
    throw new Error("Não autenticado");
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });

  if (!user) throw new Error("Usuário não encontrado");
  return user;
}

/**
 * Versão "safe" — retorna null se não houver sessão,
 * em vez de lançar erro.
 */
export async function getCurrentUserSafe() {
  const session = await auth();
  if (!session?.user?.username) return null;

  return prisma.user.findUnique({
    where: { username: session.user.username },
  });
}