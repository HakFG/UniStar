import Header from "@/components/layout/Header";
import CharacterSlideshow from "@/components/home/CharacterSlideshow";
import SeasonHighlight from "@/components/home/SeasonHighlight";
import NavigationPortals from "@/components/home/NavigationPortals";
import { prisma } from "@/lib/prisma";
import { CURRENT_SEASON } from "@/lib/constants";

export default async function Home() {
  const animes = await prisma.anime.findMany({
    where: { tipo: "GUIA_TEMPORADA", temporada: CURRENT_SEASON },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5 lg:gap-7">
          <div className="flex flex-col gap-2.5">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-text-primary leading-none">
              Uni<span className="text-accent">Star</span>
            </h1>
            <CharacterSlideshow />
          </div>

          <div className="flex flex-col gap-5 sm:gap-7">
            <SeasonHighlight animes={animes} />
            <NavigationPortals />
          </div>
        </div>
      </div>
    </main>
  );
}