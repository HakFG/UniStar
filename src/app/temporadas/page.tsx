import Link from "next/link";
import Header from "@/components/layout/Header";
import { prisma } from "@/lib/prisma";

export default async function TemporadasPage() {
  const [temporadas, temporadaAtual] = await Promise.all([
    prisma.anime.groupBy({
      by: ["temporada", "tipo"],
      _count: { id: true },
      orderBy: { temporada: "desc" },
    }),
    prisma.anime.findFirst({
      where: { tipo: "GUIA_TEMPORADA" },
      orderBy: { temporada: "desc" },
      select: { temporada: true },
    }),
  ]);

  // Agrupa por temporada
  const porTemporada = new Map<string, { guia: number; remake: number }>();
  for (const t of temporadas) {
    const atual = porTemporada.get(t.temporada) ?? { guia: 0, remake: 0 };
    if (t.tipo === "GUIA_TEMPORADA") atual.guia += t._count.id;
    else atual.remake += t._count.id;
    porTemporada.set(t.temporada, atual);
  }

  const listaTemporadas = Array.from(porTemporada.entries()).sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  const temporadaAtiva = temporadaAtual?.temporada ?? "—";

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-none">
            Histórico de Temporadas
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm mt-1">
            Todas as temporadas já registradas no UniStar
          </p>
        </div>

        {listaTemporadas.length === 0 ? (
          <div className="text-center py-16 text-text-secondary">
            <p>Nenhuma temporada registrada ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listaTemporadas.map(([temporada, dados]) => {
              const isAtual = temporada === temporadaAtiva;
              return (
                <Link
                  key={temporada}
                  href={`/temporadas/${encodeURIComponent(temporada)}`}
                  className="group rounded-2xl bg-surface backdrop-blur-md border border-white/10 hover:border-accent/60 p-5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="font-heading font-bold text-xl sm:text-2xl leading-tight">
                      {temporada}
                    </h2>
                    {isAtual && (
                      <span className="shrink-0 rounded-full bg-accent/15 border border-accent/40 px-2 py-0.5 text-[9px] font-heading font-semibold text-accent uppercase tracking-wider">
                        Atual
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 text-xs text-text-secondary">
                    <span>
                      <strong className="text-text-primary">
                        {dados.guia}
                      </strong>{" "}
                      {dados.guia === 1 ? "anime" : "animes"}
                    </span>
                    <span>
                      <strong className="text-text-primary">
                        {dados.remake}
                      </strong>{" "}
                      {dados.remake === 1 ? "remake" : "remakes"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}