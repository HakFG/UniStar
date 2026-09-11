"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function atualizarPerfil(username: string, formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  await prisma.user.update({
    where: { username },
    data: {
      nome: get("nome") || undefined,
      bio: get("bio") || null,
      avatarUrl: get("avatarUrl") || null,
      bannerUrl: get("bannerUrl") || null,
    },
  });

  revalidatePath(`/perfil/${username}`);
  revalidatePath("/");
}

export async function atribuirBadge(username: string, badgeId: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error("Usuário não encontrado");

  await prisma.userBadge.upsert({
    where: { userId_badgeId: { userId: user.id, badgeId } },
    update: {},
    create: { userId: user.id, badgeId },
  });

  revalidatePath(`/perfil/${username}`);
}

export async function removerBadge(username: string, badgeId: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error("Usuário não encontrado");

  await prisma.userBadge.deleteMany({
    where: { userId: user.id, badgeId },
  });

  revalidatePath(`/perfil/${username}`);
}

export async function criarBadge(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };

  const nome = get("nome");
  const imagemUrl = get("imagemUrl");
  if (!nome || !imagemUrl) throw new Error("Nome e URL são obrigatórios");

  const slug = nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  await prisma.badge.create({
    data: {
      slug,
      nome,
      descricao: get("descricao") || null,
      imagemUrl,
      ordem: 99,
    },
  });

  revalidatePath("/perfil");
}