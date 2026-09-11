import Header from "@/components/layout/Header";
import RemakeGrid from "@/components/remake/RemakeGrid";
import { prisma } from "@/lib/prisma";

export default async function ContinuacoesRemakesPage() {
  // Inclui previsoes para exibir o contador visual no card
  const remakes = await prisma.anime.findMany({
    where: { tipo: "CONTINUACAO_REMAKE" },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
    include: { previsoes: true },
  });

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-10">
          {/* Titulo com linha decorativa */}
          <div className="flex items-end gap-4 mb-2">
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-none">
              Continuacoes ou Remakes
            </h1>
            <div
              className="hidden sm:block flex-1 h-px mb-2"
              style={{ background: "linear-gradient(90deg, rgba(95,212,208,0.4) 0%, transparent 100%)" }}
            />
          </div>
          <p className="text-text-secondary text-sm sm:text-base">
            O que cada um aposta que vai sair
          </p>
        </div>

        <RemakeGrid remakes={remakes} />
      </div>
    </main>
  );
}