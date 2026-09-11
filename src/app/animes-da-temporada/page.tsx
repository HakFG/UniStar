import Header from "@/components/layout/Header";
import AnimeGrid from "@/components/anime/AnimeGrid";
import AnimeHero from "@/components/anime/AnimeHero";
import { prisma } from "@/lib/prisma";
import { CURRENT_SEASON } from "@/lib/constants";

export default async function AnimesDaTemporadaPage() {
  const animes = await prisma.anime.findMany({
    where: { temporada: CURRENT_SEASON },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 sm:py-7">
        <div className="mb-4 sm:mb-6">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-none">
            Animes da Temporada
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm mt-1">
            {CURRENT_SEASON}
          </p>
        </div>

        <AnimeHero animes={animes} />
        <AnimeGrid animes={animes} />
      </div>
    </main>
  );
}