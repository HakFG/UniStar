"use client";

import { useState } from "react";
import type { Anime } from "@prisma/client";
import ApostaSlot from "./ApostaSlot";
import ApostaPickerModal from "./ApostaPickerModal";
import AdminResultModal from "./AdminResultModal";
import { useCurrentUser } from "@/components/user/CurrentUserContext";
import { GRUPO_USERS } from "@/lib/constants";

interface Aposta {
  username: string;
  anime: Anime | null;
  pontos: number | null;
}

interface Props {
  categoriaId: string;
  categoriaNome: string;
  tipo: "CATEGORICA" | "NUMERICA";
  apostas: Aposta[];
  animesDisponiveis: Anime[];
  temporada: string;
  resultado: { animeId: string | null; valorNumerico: number | null } | null;
  isAdmin: boolean;
}

export default function CategoriaCard({
  categoriaId,
  categoriaNome,
  tipo,
  apostas,
  animesDisponiveis,
  temporada,
  resultado,
  isAdmin,
}: Props) {
  const { username: currentUsername } = useCurrentUser();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const minhaAposta = apostas.find((a) => a.username === currentUsername) ?? null;

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-full bg-surface backdrop-blur-md border border-white/10 px-4 py-2 text-center">
            <h2 className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider text-text-primary">
              {categoriaNome}
            </h2>
          </div>
          {isAdmin && (
            <button
              type="button"
              onClick={() => setAdminOpen(true)}
              className="shrink-0 rounded-full bg-accent/15 border border-accent/40 px-3 py-2 text-[10px] font-heading font-semibold text-accent hover:bg-accent/25 transition-colors"
            >
              Fechar
            </button>
          )}
        </div>

        {resultado && (
          <div className="text-center text-[10px] text-text-secondary">
            Resultado:{" "}
            <span className="text-accent font-semibold">
              {tipo === "CATEGORICA"
                ? animesDisponiveis.find((a) => a.id === resultado.animeId)?.titulo ?? "—"
                : resultado.valorNumerico}
            </span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 max-w-[70%] mx-auto w-full">
          {GRUPO_USERS.map((u) => {
            const aposta = apostas.find((a) => a.username === u.username);
            return (
              <ApostaSlot
                key={u.username}
                username={u.username}
                nome={u.nome}
                anime={aposta?.anime ?? null}
                pontos={aposta?.pontos ?? null}
                onPick={() => setPickerOpen(true)}
              />
            );
          })}
        </div>
      </div>

      {pickerOpen && (
        <ApostaPickerModal
          categoriaId={categoriaId}
          categoriaNome={categoriaNome}
          tipo={tipo}
          username={currentUsername}
          temporada={temporada}
          animesDisponiveis={animesDisponiveis}
          temAposta={!!minhaAposta}
          onClose={() => setPickerOpen(false)}
        />
      )}

      {adminOpen && (
        <AdminResultModal
          categoriaId={categoriaId}
          categoriaNome={categoriaNome}
          tipo={tipo}
          temporada={temporada}
          animesDisponiveis={animesDisponiveis}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </>
  );
}