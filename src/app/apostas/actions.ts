"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function resetarTudo() {
  await prisma.aposta.deleteMany();
  await prisma.resultadoCategoria.deleteMany();
  await prisma.user.updateMany({ data: { pontuacao: 0 } });

  revalidatePath("/apostas");
  revalidatePath("/perfil");
  revalidatePath("/");
}

export async function setAposta(
  categoriaId: string,
  username: string,
  temporada: string,
  animeId: string | null,
  valorNumerico: number | null,
  watched: boolean
) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new Error("Usuário não encontrado");

  if (!animeId && valorNumerico === null) {
    await prisma.aposta.deleteMany({
      where: { categoriaId, userId: user.id, temporada },
    });
    revalidatePath("/apostas");
    return;
  }

  await prisma.aposta.upsert({
    where: {
      categoriaId_userId_temporada: {
        categoriaId,
        userId: user.id,
        temporada,
      },
    },
    update: { animeId, valorNumerico, watched },
    create: {
      categoriaId,
      userId: user.id,
      temporada,
      animeId,
      valorNumerico,
      watched,
    },
  });

  revalidatePath("/apostas");
}

export async function registrarResultado(
  categoriaId: string,
  temporada: string,
  animeId: string | null,
  valorNumerico: number | null
) {
  await prisma.resultadoCategoria.upsert({
    where: { categoriaId_temporada: { categoriaId, temporada } },
    update: { animeId, valorNumerico, fechadoEm: new Date() },
    create: { categoriaId, temporada, animeId, valorNumerico },
  });

  await calcularPontuacoes(categoriaId, temporada);

  revalidatePath("/apostas");
  revalidatePath("/perfil");
  revalidatePath("/");
}

async function calcularPontuacoes(categoriaId: string, temporada: string) {
  const categoria = await prisma.categoria.findUnique({
    where: { id: categoriaId },
  });
  if (!categoria) throw new Error("Categoria não encontrada");

  const resultado = await prisma.resultadoCategoria.findUnique({
    where: { categoriaId_temporada: { categoriaId, temporada } },
  });
  if (!resultado) return;

  const apostas = await prisma.aposta.findMany({
    where: { categoriaId, temporada },
  });

  const PARTICIPATION_POINTS = 20;
  const ACCURACY_POINTS = 80;

  if (categoria.tipo === "NUMERICA") {
    const actual = resultado.valorNumerico ?? 0;
    const distances = apostas
      .filter((a) => a.valorNumerico !== null)
      .map((a) => Math.abs((a.valorNumerico as number) - actual));

    if (distances.length === 0) return;

    distances.sort((a, b) => a - b);
    const median =
      distances.length % 2 === 0
        ? (distances[distances.length / 2 - 1] + distances[distances.length / 2]) / 2
        : distances[Math.floor(distances.length / 2)];

    for (const aposta of apostas) {
      if (aposta.valorNumerico === null) {
        await prisma.aposta.update({
          where: { id: aposta.id },
          data: { pontos: PARTICIPATION_POINTS },
        });
        continue;
      }

      const dist = Math.abs(aposta.valorNumerico - actual);
      let accuracy = 0;
      if (median === 0) {
        accuracy = ACCURACY_POINTS;
      } else {
        accuracy = Math.max(0, ACCURACY_POINTS * (1 - dist / (2.5 * median)));
      }

      if (!aposta.watched) accuracy = accuracy / 2;

      await prisma.aposta.update({
        where: { id: aposta.id },
        data: { pontos: Math.round(PARTICIPATION_POINTS + accuracy) },
      });
    }
  } else {
    const voteCounts = new Map<string, number>();
    for (const aposta of apostas) {
      if (aposta.animeId) {
        voteCounts.set(aposta.animeId, (voteCounts.get(aposta.animeId) ?? 0) + 1);
      }
    }

    const sortedAnimes = [...voteCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id);

    const rankMap = new Map<string, number>();
    sortedAnimes.forEach((id, idx) => rankMap.set(id, idx));

    for (const aposta of apostas) {
      if (!aposta.animeId) {
        await prisma.aposta.update({
          where: { id: aposta.id },
          data: { pontos: PARTICIPATION_POINTS },
        });
        continue;
      }

      let accuracy = 0;
      if (aposta.animeId === resultado.animeId) {
        accuracy = ACCURACY_POINTS;
      } else {
        const rank = rankMap.get(aposta.animeId);
        if (rank === 1) accuracy = 50;
        else if (rank === 2) accuracy = 30;
        else accuracy = 10;
      }

      if (!aposta.watched) accuracy = accuracy / 2;

      await prisma.aposta.update({
        where: { id: aposta.id },
        data: { pontos: Math.round(PARTICIPATION_POINTS + accuracy) },
      });
    }
  }

  // Recalcular pontuação total de cada usuário
  const allApostas = await prisma.aposta.findMany({
    where: { temporada, pontos: { not: null } },
  });

  const userPoints = new Map<string, number>();
  for (const a of allApostas) {
    userPoints.set(a.userId, (userPoints.get(a.userId) ?? 0) + (a.pontos ?? 0));
  }

  for (const [userId, pontos] of userPoints) {
    await prisma.user.update({
      where: { id: userId },
      data: { pontuacao: pontos },
    });
  }
}