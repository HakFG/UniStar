import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import ProfileHeader from "@/components/perfil/ProfileHeader";
import ApostaAtualCard from "@/components/perfil/ApostaAtualCard";
import PontuacaoCard from "@/components/perfil/PontuacaoCard";
import BadgesGrid from "@/components/perfil/BadgesGrid";
import { prisma } from "@/lib/prisma";
import { CURRENT_SEASON } from "@/lib/constants";

export default async function PerfilPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      badges: {
        include: { badge: true },
        orderBy: { ganhoEm: "asc" },
      },
      apostas: {
        where: { temporada: CURRENT_SEASON },
        include: { anime: true, categoria: true },
      },
    },
  });

  if (!user) notFound();

  const todasBadges = await prisma.badge.findMany({
    orderBy: { ordem: "asc" },
  });

  // Aposta atual = a escolha dele na categoria "Anime da Temporada"
  const apostaAtual =
    user.apostas.find((a) => a.categoria.slug === "anime_da_temporada")?.anime ??
    null;

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 sm:py-7">
        {/* Row 1: bloco info + avatar */}
        <ProfileHeader user={user} />

        {/* Row 2: Aposta Atual · Pontuação · Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr] gap-5 mt-5">
          <ApostaAtualCard anime={apostaAtual} />
          <PontuacaoCard pontuacao={user.pontuacao} />
          <div className="md:col-span-2 lg:col-span-1">
            <BadgesGrid
              username={user.username}
              badges={user.badges}
              todasBadges={todasBadges}
            />
          </div>
        </div>
      </div>
    </main>
  );
}