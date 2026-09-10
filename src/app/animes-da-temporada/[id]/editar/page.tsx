import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import AnimeForm from "@/components/anime/AnimeForm";
import { prisma } from "@/lib/prisma";
import { updateAnime } from "../../actions";

export default async function EditarAnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const anime = await prisma.anime.findUnique({ where: { id } });
  if (!anime) notFound();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-6 sm:py-10">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-6">
          Editar: {anime.titulo}
        </h1>
        <AnimeForm
          mode="edit"
          initialData={anime}
          onSubmit={updateAnime.bind(null, id)}
        />
      </div>
    </main>
  );
}