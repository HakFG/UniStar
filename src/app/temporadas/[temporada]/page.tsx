import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import { prisma } from "@/lib/prisma";

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ temporada: string }>;
}): Promise<Metadata> {
  const { temporada } = await params;
  const nome = decodeURIComponent(temporada);

  return buildMetadata({
    title: nome,
    description: `Animes, remakes e apostas da temporada ${nome}`,
    path: `/temporadas/${temporada}`,
  });
}

export default async function TemporadaPage({
  params,
}: {
  params: Promise<{ temporada: string }>;
}) {
  const { temporada } = await params;
  const nomeTemporada = decodeURIComponent(temporada);

  const [animes, remakes, resultados] = await Promise.all([
    prisma.anime.findMany({
      where: { tipo: "GUIA_TEMPORADA", temporada: nomeTemporada },
      orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    }),
    prisma.anime.findMany({
      where: { tipo: "CONTINUACAO_REMAKE", temporada: nomeTemporada },
      orderBy: { createdAt: "desc" },
    }),
    prisma.resultadoCategoria.findMany({
      where: { temporada: nomeTemporada },
      include: { categoria: true, anime: true },
      orderBy: { categoria: { ordem: "asc" } },
    }),
  ]);

  if (animes.length === 0 && remakes.length === 0) notFound();

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <Link
          href="/temporadas"
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-accent transition-colors mb-5"
        >
          ← Voltar para o histórico
        </Link>

        <div className="mb-6 sm:mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-none">
            {nomeTemporada}
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm mt-1">
            {animes.length} {animes.length === 1 ? "anime" : "animes"} ·{" "}
            {remakes.length} {remakes.length === 1 ? "remake" : "remakes"}
          </p>
        </div>

        {/* Animes */}
        {animes.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading font-bold text-xl sm:text-2xl mb-4">
              Animes da Temporada
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {animes.map((a) => (
                <Link
                  key={a.id}
                  href={`/animes-da-temporada/${a.id}`}
                  className="group block"
                >
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-white/5 shadow-lg shadow-black/40 transition-transform group-hover:scale-[1.02]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.capaUrl}
                      alt={a.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs text-text-secondary truncate text-center group-hover:text-accent transition-colors">
                    {a.titulo}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Remakes */}
        {remakes.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading font-bold text-xl sm:text-2xl mb-4">
              Continuações ou Remakes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {remakes.map((r) => (
                <Link
                  key={r.id}
                  href={`/continuacoes-remakes/${r.id}`}
                  className="group flex items-center"
                >
                  <div className="shrink-0 w-24 h-32 rounded-lg overflow-hidden border border-white/10 bg-surface z-10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.capaUrl}
                      alt={r.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="-ml-6 flex-1 rounded-full bg-surface backdrop-blur-md border border-white/10 group-hover:border-accent/60 min-h-[64px] flex items-center justify-center pl-9 pr-4 transition-colors">
                    <span className="font-heading font-semibold text-xs text-text-primary group-hover:text-accent transition-colors text-center leading-tight line-clamp-2">
                      {r.titulo}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Resultados das apostas */}
        {resultados.length > 0 && (
          <section>
            <h2 className="font-heading font-bold text-xl sm:text-2xl mb-4">
              Resultados das Apostas
            </h2>
            <div className="rounded-2xl bg-surface backdrop-blur-md border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-base/40">
                  <tr>
                    <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary">
                      Categoria
                    </th>
                    <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary">
                      Vencedor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((r) => (
                    <tr
                      key={r.id}
                      className="border-t border-white/5"
                    >
                      <td className="px-4 py-3">{r.categoria.nome}</td>
                      <td className="px-4 py-3 text-accent font-semibold">
                        {r.anime?.titulo ??
                          r.valorNumerico?.toString() ??
                          "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}