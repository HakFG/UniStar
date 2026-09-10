import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import AnimeStaffCard from "@/components/anime/AnimeStaffCard";
import AnimeNotesCard from "@/components/anime/AnimeNotesCard";
import AnimeTrailerButton from "@/components/anime/AnimeTrailerButton";
import { prisma } from "@/lib/prisma";

export default async function AnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const anime = await prisma.anime.findUnique({ where: { id } });
  if (!anime) notFound();

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        {/* Voltar */}
        <Link
          href="/animes-da-temporada"
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-accent transition-colors mb-5"
        >
          ← Voltar para a grade
        </Link>

        {/* 3 colunas em desktop, empilhado em mobile */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.2fr_1.5fr_1.2fr] lg:gap-8 lg:items-start">
          {/* Coluna 1 — Título + Sinopse */}
          <div className="order-2 lg:order-none flex flex-col gap-5">
            {/* Título (PNG ou texto) */}
            <div>
              {anime.tituloImgUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={anime.tituloImgUrl}
                  alt={anime.titulo}
                  className="max-w-full h-auto"
                />
              ) : (
                <h1 className="font-heading font-bold text-2xl sm:text-3xl leading-tight">
                  {anime.titulo}
                </h1>
              )}
            </div>

            {/* Sinopse */}
            {anime.sinopse && (
              <div className="rounded-2xl bg-surface backdrop-blur-md border border-white/10 p-5">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-text-secondary mb-3">
                  Sinopse
                </h3>
                <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                  {anime.sinopse}
                </p>
              </div>
            )}
          </div>

          {/* Coluna 2 — Capa (mobile: primeira) */}
          <div className="order-1 lg:order-none">
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden bg-surface border border-white/5 shadow-2xl shadow-black/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={anime.capaUrl}
                alt={anime.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Coluna 3 — Trailer + Staff + Notas */}
          <div className="order-3 lg:order-none flex flex-col gap-5">
            <AnimeTrailerButton url={anime.trailerUrl} />
            <AnimeStaffCard anime={anime} />
            <AnimeNotesCard notas={anime.notasNandao} />
          </div>
        </div>
      </div>
    </main>
  );
}