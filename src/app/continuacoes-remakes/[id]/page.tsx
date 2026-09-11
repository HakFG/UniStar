import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import RemakeDetailBlocks from "@/components/remake/RemakeDetailBlocks";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const remake = await prisma.anime.findUnique({ where: { id }, select: { titulo: true, capaUrl: true } });
  if (!remake) return { title: "Remake nao encontrado - UniStar" };
  return buildMetadata({ title: remake.titulo, description: "Continuacao ou remake previsto pelo grupo", image: remake.capaUrl, path: `/continuacoes-remakes/${id}` });
}

export default async function RemakePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const remake = await prisma.anime.findUnique({
    where: { id },
    include: { previsoes: { include: { user: true } } },
  });

  if (!remake || remake.tipo !== "CONTINUACAO_REMAKE") notFound();

  const previsoes = remake.previsoes.map((p) => ({
    username: p.user.username,
    data: p.data,
  }));

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <Link
          href="/continuacoes-remakes"
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-accent transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">&#8592;</span>
          Voltar para a lista
        </Link>

        <RemakeDetailBlocks remake={{ ...remake, previsoes }} />
      </div>
    </main>
  );
}