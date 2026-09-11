import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import RemakeForm from "@/components/remake/RemakeForm";
import { prisma } from "@/lib/prisma";
import { updateRemake } from "../../actions";

export default async function EditarRemakePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const remake = await prisma.anime.findUnique({
    where: { id },
    include: { previsoes: { include: { user: true } } },
  });

  if (!remake || remake.tipo !== "CONTINUACAO_REMAKE") notFound();

  const initialPrevisoes = remake.previsoes.map((p) => ({
    username: p.user.username,
    data: p.data,
  }));

  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-6 sm:py-10">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-6">
          Editar: {remake.titulo}
        </h1>
        <RemakeForm
          mode="edit"
          initialData={remake}
          initialPrevisoes={initialPrevisoes}
          onSubmit={updateRemake.bind(null, id)}
        />
      </div>
    </main>
  );
}