import { cookies } from "next/headers";
import Header from "@/components/layout/Header";
import CharacterSlideshow from "@/components/home/CharacterSlideshow";
import SeasonHighlight from "@/components/home/SeasonHighlight";
import NavigationPortals from "@/components/home/NavigationPortals";
import { prisma } from "@/lib/prisma";
import { getTemporadaAtual, getTodasTemporadas } from "@/lib/temporadas";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ temporada?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();

  const temporadaAtual = await getTemporadaAtual();

  // Prioridade:
  // 1. ?temporada=X na URL (se alguém compartilhou link)
  // 2. Cookie (última escolha salva)
  // 3. Temporada atual do banco
  const temporadaSelecionada =
    params.temporada ??
    cookieStore.get("unistar_temporada")?.value ??
    temporadaAtual;

  const [animes, todasTemporadas] = await Promise.all([
    prisma.anime.findMany({
      where: { tipo: "GUIA_TEMPORADA", temporada: temporadaSelecionada },
      orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    }),
    getTodasTemporadas(),
  ]);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5 lg:gap-7">
          <div className="flex flex-col gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Unistar_Nick.png"
              alt="UniStar"
              className="w-44 sm:w-52 lg:w-60 h-auto object-contain"
            />
            <CharacterSlideshow />
          </div>

          <div className="flex flex-col gap-5 sm:gap-7">
            <SeasonHighlight
              animes={animes}
              temporada={temporadaSelecionada}
              temporadas={todasTemporadas}
              temporadaAtual={temporadaAtual}
            />
            <NavigationPortals />
          </div>
        </div>
      </div>
    </main>
  );
}