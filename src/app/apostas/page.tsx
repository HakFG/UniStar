import Header from "@/components/layout/Header";
import ApostasGrid from "@/components/aposta/ApostasGrid";
import LiderCard from "@/components/aposta/LiderCard";
import { prisma } from "@/lib/prisma";
import { CURRENT_SEASON, DEFAULT_USERNAME } from "@/lib/constants";

export default async function ApostasPage() {
  const [categorias, animesDisponiveis, users] = await Promise.all([
    prisma.categoria.findMany({
      orderBy: { ordem: "asc" },
      include: {
        apostas: {
          where: { temporada: CURRENT_SEASON },
          include: { anime: true, user: true },
        },
        resultados: { where: { temporada: CURRENT_SEASON } },
      },
    }),
    prisma.anime.findMany({
      where: { tipo: "GUIA_TEMPORADA", temporada: CURRENT_SEASON },
      orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    }),
    prisma.user.findMany({ orderBy: { username: "asc" } }),
  ]);

  const lider = users.reduce((best, u) =>
    u.pontuacao > best.pontuacao ? u : best
  );

  // Por enquanto, admin = Nandão (até o Sistema de Contas entrar)
  const isAdmin = true; // sempre true; o botão só aparece pro Nandão de qualquer forma

  const categoriasFormatadas = categorias.map((c) => {
    const resultado = c.resultados[0] ?? null;
    return {
      id: c.id,
      nome: c.nome,
      tipo: c.tipo as "CATEGORICA" | "NUMERICA",
      apostas: c.apostas.map((a) => ({
        username: a.user.username,
        anime: a.anime,
        pontos: a.pontos,
      })),
      resultado: resultado
        ? { animeId: resultado.animeId, valorNumerico: resultado.valorNumerico }
        : null,
    };
  });

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-none">
            Apostas dos Donos
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mt-2">
            {CURRENT_SEASON}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-10 items-start">
          <div className="lg:sticky lg:top-24">
            <LiderCard lider={lider} />
          </div>

          <div>
            <ApostasGrid
              categorias={categoriasFormatadas}
              animesDisponiveis={animesDisponiveis}
              temporada={CURRENT_SEASON}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </div>
    </main>
  );
}