"use client";

import { useState } from "react";
import type { Anime } from "@prisma/client";
import ApostaSlot from "./ApostaSlot";
import ApostaPickerModal from "./ApostaPickerModal";
import AdminResultModal from "./AdminResultModal";
import { useCurrentUser } from "@/components/user/CurrentUserContext";
import { GRUPO_USERS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

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
  index?: number;
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
  index = 0,
}: Props) {
  const { username: currentUsername } = useCurrentUser();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const minhaAposta = apostas.find((a) => a.username === currentUsername) ?? null;
  const temResultado = Boolean(resultado);

  const resultadoLabel = temResultado
    ? tipo === "CATEGORICA"
      ? animesDisponiveis.find((a) => a.id === resultado!.animeId)?.titulo ?? "—"
      : String(resultado!.valorNumerico)
    : null;

  return (
    <>
      <motion.div
        className="flex flex-col gap-3 group/card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Pill da categoria */}
        <div className="flex items-center gap-2">
          <div
            className="flex-1 rounded-full backdrop-blur-md px-4 py-2 text-center relative overflow-hidden transition-all duration-300"
            style={{
              background: temResultado
                ? "linear-gradient(135deg, rgba(95,212,208,0.12) 0%, rgba(91,42,134,0.1) 100%)"
                : "rgba(30,27,45,0.6)",
              boxShadow: temResultado
                ? "0 0 0 1px rgba(95,212,208,0.3)"
                : "0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            {/* Shimmer no hover */}
            <div
              className="absolute inset-y-0 -left-full w-1/2 group-hover/card:left-[120%] transition-all duration-700 ease-in-out pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
            />
            <h2 className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider text-text-primary relative z-10">
              {categoriaNome}
            </h2>
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={() => setAdminOpen(true)}
              className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-heading font-semibold transition-all duration-200 ${
                temResultado
                  ? "bg-accent/10 border border-accent/30 text-accent/60 hover:bg-accent/20"
                  : "bg-accent/15 border border-accent/40 text-accent hover:bg-accent/25 hover:shadow-[0_0_10px_rgba(95,212,208,0.2)]"
              }`}
            >
              {temResultado ? "✓ Fechado" : "Fechar"}
            </button>
          )}
        </div>

        {/* Resultado em destaque */}
        {temResultado && resultadoLabel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="text-center text-[10px] rounded-full py-1 px-3 mx-auto"
            style={{
              background: "rgba(95,212,208,0.08)",
              border: "1px solid rgba(95,212,208,0.25)",
              color: "rgba(95,212,208,0.9)",
            }}
          >
            <span className="text-text-secondary">Resultado: </span>
            <span className="font-heading font-bold">{resultadoLabel}</span>
          </motion.div>
        )}

        {/* 3 slots */}
        <div className="grid grid-cols-3 gap-2 max-w-[70%] mx-auto w-full">
          {GRUPO_USERS.map((u) => {
            const aposta = apostas.find((a) => a.username === u.username);
            // Calcula acerto: se tem resultado e pontos > 0 acertou, se tem resultado e pontos === 0 errou
            const acertou = temResultado && (aposta?.pontos ?? 0) > 0;
            const errou = temResultado && aposta?.anime != null && (aposta?.pontos ?? 0) === 0;
            return (
              <ApostaSlot
                key={u.username}
                username={u.username}
                nome={u.nome}
                anime={aposta?.anime ?? null}
                pontos={aposta?.pontos ?? null}
                acertou={acertou}
                errou={errou}
                onPick={() => setPickerOpen(true)}
              />
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {pickerOpen && (
          <ApostaPickerModal
            categoriaId={categoriaId}
            categoriaNome={categoriaNome}
            tipo={tipo}
            username={currentUsername ?? ""}
            temporada={temporada}
            animesDisponiveis={animesDisponiveis}
            temAposta={!!minhaAposta}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}