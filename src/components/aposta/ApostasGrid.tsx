"use client";

import type { Anime } from "@prisma/client";
import CategoriaCard from "./CategoriaCard";

interface Categoria {
  id: string;
  nome: string;
  tipo: "CATEGORICA" | "NUMERICA";
  apostas: { username: string; anime: Anime | null; pontos: number | null }[];
  resultado: { animeId: string | null; valorNumerico: number | null } | null;
}

interface Props {
  categorias: Categoria[];
  animesDisponiveis: Anime[];
  temporada: string;
  isAdmin: boolean;
}

export default function ApostasGrid({
  categorias,
  animesDisponiveis,
  temporada,
  isAdmin,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {categorias.map((c) => (
        <CategoriaCard
          key={c.id}
          categoriaId={c.id}
          categoriaNome={c.nome}
          tipo={c.tipo}
          apostas={c.apostas}
          animesDisponiveis={animesDisponiveis}
          temporada={temporada}
          resultado={c.resultado}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}