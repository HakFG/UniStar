"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

/** Por enquanto, admin = Nandão. Depois migra pra role. */
async function exigirAdmin() {
  const user = await getCurrentUser();
  if (user.username !== "nandao") {
    throw new Error("Apenas o admin pode gerenciar temporadas");
  }
  return user;
}

export async function definirTemporadaAtual(id: string) {
  await exigirAdmin();

  // Desativa todas antes de ativar a nova (garante uma única atual)
  await prisma.temporada.updateMany({
    data: { isAtual: false },
  });
  await prisma.temporada.update({
    where: { id },
    data: { isAtual: true },
  });

  revalidatePath("/", "layout"); // recarrega tudo
}

export async function criarTemporada(formData: FormData) {
  await exigirAdmin();

  const nome = (formData.get("nome") as string)?.trim();
  const ordemRaw = formData.get("ordem") as string;
  const ordem = parseInt(ordemRaw, 10);

  if (!nome || isNaN(ordem)) {
    throw new Error("Nome e ordem são obrigatórios");
  }

  await prisma.temporada.create({
    data: { nome, ordem },
  });

  revalidatePath("/admin/temporadas");
}

export async function deletarTemporada(id: string) {
  await exigirAdmin();

  const temp = await prisma.temporada.findUnique({ where: { id } });
  if (!temp) throw new Error("Temporada não encontrada");
  if (temp.isAtual) throw new Error("Não pode deletar a temporada atual");

  // Verifica se tem animes vinculados
  const animesCount = await prisma.anime.count({
    where: { temporada: temp.nome },
  });
  if (animesCount > 0) {
    throw new Error(
      `Não pode deletar — existem ${animesCount} animes nessa temporada`
    );
  }

  await prisma.temporada.delete({ where: { id } });
  revalidatePath("/admin/temporadas");
}