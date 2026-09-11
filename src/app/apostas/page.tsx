import Header from "@/components/layout/Header";
import ApostasGrid from "@/components/aposta/ApostasGrid";
import ApostasHeader from "@/components/aposta/ApostasHeader";
import { prisma } from "@/lib/prisma";
import { getTemporadaAtual } from "@/lib/temporadas";

export default async function ApostasPage() {
  const temporadaAtual = await getTemporadaAtual();

  const [categorias, animesDisponiveis, users] = await Promise.all([
    prisma.categoria.findMany({
      orderBy: { ordem: "asc" },
      include: {
        apostas: {
          where: { temporada: temporadaAtual },
          include: { anime: true, user: true },
        },
        resultados: { where: { temporada: temporadaAtual } },
      },
    }),
    prisma.anime.findMany({
      where: { tipo: "GUIA_TEMPORADA", temporada: temporadaAtual },
      orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    }),
    prisma.user.findMany({ orderBy: { pontuacao: "desc" } }),
  ]);

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

  // Passa os 3 primeiros para o bloco lateral (podio + lider)
  const top3 = users.slice(0, 3).map((u) => ({
    id: u.id,
    nome: u.nome,
    username: u.username,
    pontuacao: u.pontuacao,
    avatarUrl: u.avatarUrl,
  }));

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-none">
            Apostas dos Donos
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mt-2">
            {temporadaAtual}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-10 items-start">
          <div className="lg:sticky lg:top-24">
            <ApostasHeader top3={top3} />
          </div>

          <div>
            <ApostasGrid
              categorias={categoriasFormatadas}
              animesDisponiveis={animesDisponiveis}
              temporada={temporadaAtual}
              isAdmin={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
}