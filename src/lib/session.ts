import { prisma } from "./prisma";
import { DEFAULT_USERNAME } from "./constants";

// TODO: substituir por session real quando o Sistema de Contas for implementado.
export async function getCurrentUser() {
  const user = await prisma.user.findUnique({
    where: { username: DEFAULT_USERNAME },
  });
  if (!user) {
    throw new Error(
      `Usuário padrão "${DEFAULT_USERNAME}" não existe. Rode: npx prisma db seed`
    );
  }
  return user;
}