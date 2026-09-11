import Header from "@/components/layout/Header";
import RemakeGrid from "@/components/remake/RemakeGrid";
import { prisma } from "@/lib/prisma";

export default async function ContinuacoesRemakesPage() {
  const remakes = await prisma.anime.findMany({
    where: { tipo: "CONTINUACAO_REMAKE" },
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-10">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-none">
            Continuações ou Remakes
          </h1>
          <p className="text-text-secondary text-sm sm:text-base mt-2">
            O que cada um aposta que vai sair
          </p>
        </div>

        <RemakeGrid remakes={remakes} />
      </div>
    </main>
  );
}