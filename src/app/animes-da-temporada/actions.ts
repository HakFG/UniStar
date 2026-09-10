"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

function parseForm(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  return {
    titulo: get("titulo"),
    tituloImgUrl: get("tituloImgUrl") || null,
    capaUrl: get("capaUrl"),
    sinopse: get("sinopse") || null,
    estudio: get("estudio") || null,
    diretor: get("diretor") || null,
    characterDesign: get("characterDesign") || null,
    compositor: get("compositor") || null,
    adaptador: get("adaptador") || null,
    notasNandao: get("notasNandao") || null,
    trailerUrl: get("trailerUrl") || null,
    temporada: get("temporada"),
  };
}

export async function createAnime(formData: FormData) {
  const data = parseForm(formData);
  if (!data.titulo || !data.capaUrl || !data.temporada) {
    throw new Error("Título, capa e temporada são obrigatórios.");
  }
  const user = await getCurrentUser();

  const anime = await prisma.anime.create({
    data: {
      ...data,
      criadoPorId: user.id,
    },
  });

  revalidatePath("/animes-da-temporada");
  revalidatePath("/");
  redirect(`/animes-da-temporada/${anime.id}`);
}

export async function updateAnime(id: string, formData: FormData) {
  const data = parseForm(formData);
  if (!data.titulo || !data.capaUrl || !data.temporada) {
    throw new Error("Título, capa e temporada são obrigatórios.");
  }

  await prisma.anime.update({
    where: { id },
    data,
  });

  revalidatePath("/animes-da-temporada");
  revalidatePath(`/animes-da-temporada/${id}`);
  revalidatePath("/");
  redirect(`/animes-da-temporada/${id}`);
}

export async function deleteAnime(id: string) {
  await prisma.anime.delete({ where: { id } });
  revalidatePath("/animes-da-temporada");
  revalidatePath("/");
  redirect("/animes-da-temporada");
}