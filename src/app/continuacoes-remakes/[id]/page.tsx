import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import PrevisoesCard from "@/components/remake/PrevisoesCard";
import { prisma } from "@/lib/prisma";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const remake = await prisma.anime.findUnique({
    where: { id },
    select: { titulo: true, capaUrl: true },
  });

  if (!remake) return { title: "Remake não encontrado · UniStar" };

  return buildMetadata({
    title: remake.titulo,
    description: "Continuação ou remake previsto pelo grupo",
    image: remake.capaUrl,
    path: `/continuacoes-remakes/${id}`,
  });
}

export default async function RemakePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const remake = await prisma.anime.findUnique({
    where: { id },
    include: { previsoes: { include: { user: true } } },
  });

  if (!remake || remake.tipo !== "CONTINUACAO_REMAKE") notFound();

  const previsoes = remake.previsoes.map((p) => ({
    username: p.user.username,
    data: p.data,
  }));

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <Link
          href="/continuacoes-remakes"
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-accent transition-colors mb-8"
        >
          ← Voltar para a lista
        </Link>

        {/* 3 colunas — desktop; empilhado no mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] gap-6 lg:gap-10 items-center">
          {/* Coluna 1 — Bloco do Título */}
          <div className="order-2 lg:order-none flex justify-center">
            <div className="w-full max-w-[280px] rounded-3xl bg-surface backdrop-blur-md border border-white/10 px-6 py-10 text-center shadow-lg shadow-black/30">
              {remake.tituloImgUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={remake.tituloImgUrl}
                  alt={remake.titulo}
                  className="max-w-full h-auto mx-auto"
                />
              ) : (
                <h1 className="font-heading font-bold text-2xl sm:text-3xl leading-tight">
                  {remake.titulo}
                </h1>
              )}
            </div>
          </div>

          {/* Coluna 2 — Capa grande (elemento dominante) */}
          <div className="order-1 lg:order-none flex justify-center">
            <div className="relative w-full max-w-md aspect-[2/3] rounded-3xl overflow-hidden bg-surface border border-white/10 shadow-2xl shadow-black/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={remake.capaUrl}
                alt={remake.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Coluna 3 — Previsão */}
          <div className="order-3 lg:order-none flex justify-center">
            <div className="w-full max-w-[280px]">
              <PrevisoesCard previsoes={previsoes} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}