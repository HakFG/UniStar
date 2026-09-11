"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { GRUPO_USERS, REMAKE_CATEGORY } from "@/lib/constants";

function parseBase(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  return {
    titulo: get("titulo"),
    tituloImgUrl: get("tituloImgUrl") || null,
    capaUrl: get("capaUrl"),
  };
}

async function savePrevisoes(animeId: string, formData: FormData) {
  // Mapeia username → userId
  const usernames = GRUPO_USERS.map((u) => u.username);
  const users = await prisma.user.findMany({
    where: { username: { in: usernames } },
  });
  const userByUsername = new Map(users.map((u) => [u.username, u.id]));

  for (const u of GRUPO_USERS) {
    const raw = formData.get(`previsao_${u.username}`);
    const data = typeof raw === "string" ? raw.trim() : "";
    const userId = userByUsername.get(u.username);
    if (!userId) continue;

    if (!data) {
      // Se vazio, remove previsão existente (se houver)
      await prisma.previsao.deleteMany({ where: { animeId, userId } });
      continue;
    }

    await prisma.previsao.upsert({
      where: { animeId_userId: { animeId, userId } },
      create: { animeId, userId, data },
      update: { data },
    });
  }
}

export async function createRemake(formData: FormData) {
  const data = parseBase(formData);
  if (!data.titulo || !data.capaUrl) {
    throw new Error("Título e capa são obrigatórios.");
  }
  const user = await getCurrentUser();

  const anime = await prisma.anime.create({
    data: {
      ...data,
      tipo: "CONTINUACAO_REMAKE",
      temporada: REMAKE_CATEGORY,
      criadoPorId: user.id,
    },
  });

  await savePrevisoes(anime.id, formData);

  revalidatePath("/continuacoes-remakes");
  redirect(`/continuacoes-remakes/${anime.id}`);
}

export async function updateRemake(id: string, formData: FormData) {
  const data = parseBase(formData);
  if (!data.titulo || !data.capaUrl) {
    throw new Error("Título e capa são obrigatórios.");
  }

  await prisma.anime.update({ where: { id }, data });

  await savePrevisoes(id, formData);

  revalidatePath("/continuacoes-remakes");
  revalidatePath(`/continuacoes-remakes/${id}`);
  redirect(`/continuacoes-remakes/${id}`);
}

export async function deleteRemake(id: string) {
  // onDelete: Cascade no schema já remove as previsões automaticamente
  await prisma.anime.delete({ where: { id } });
  revalidatePath("/continuacoes-remakes");
  redirect("/continuacoes-remakes");
}