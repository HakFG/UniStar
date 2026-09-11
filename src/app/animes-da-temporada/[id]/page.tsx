import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import AnimeDetailBlocks from "@/components/anime/AnimeDetailBlocks";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const anime = await prisma.anime.findUnique({ where: { id }, select: { titulo: true, sinopse: true, capaUrl: true } });
  if (!anime) return { title: "Anime nao encontrado - UniStar" };
  return buildMetadata({ title: anime.titulo, description: anime.sinopse?.slice(0, 160) ?? undefined, image: anime.capaUrl, path: `/animes-da-temporada/${id}` });
}

export default async function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const anime = await prisma.anime.findUnique({ where: { id } });
  if (!anime) notFound();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <Link href="/animes-da-temporada" className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-accent transition-colors mb-6 group">
          <span className="group-hover:-translate-x-0.5 transition-transform duration-200">&#8592;</span>
          Voltar para a grade
        </Link>
        <AnimeDetailBlocks anime={anime} />
      </div>
    </main>
  );
}