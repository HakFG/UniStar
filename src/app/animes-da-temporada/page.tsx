import Header from "@/components/layout/Header";
import AnimeGrid from "@/components/anime/AnimeGrid";
import AnimeHero from "@/components/anime/AnimeHero";
import { prisma } from "@/lib/prisma";

export default async function AnimesDaTemporadaPage() {
  // Busca TODOS os animes guia (sem filtro de temporada)
  // A ordenação coloca temporada mais recente primeiro, depois por ordem
  const animes = await prisma.anime.findMany({
    where: { tipo: "GUIA_TEMPORADA" },
    orderBy: [{ temporada: "desc" }, { ordem: "asc" }, { createdAt: "desc" }],
  });

  // Agrupa por temporada
  const porTemporada = new Map<string, typeof animes>();
  for (const a of animes) {
    const lista = porTemporada.get(a.temporada) ?? [];
    lista.push(a);
    porTemporada.set(a.temporada, lista);
  }

  // Ordena os grupos pela temporada mais recente primeiro
  const grupos = Array.from(porTemporada.entries()).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 sm:py-7">
        <div className="mb-4 sm:mb-6">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-none">
            Animes da Temporada
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm mt-1">
            Todas as temporadas cadastradas
          </p>
        </div>

        {/* Hero continua usando o anime mais recente */}
        <AnimeHero animes={animes} />

        {/* Grade agrupada por temporada */}
        <AnimeGrid grupos={grupos} />
      </div>
    </main>
  );
}