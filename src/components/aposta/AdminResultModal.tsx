"use client";

import { useState, useTransition } from "react";
import type { Anime } from "@prisma/client";
import { registrarResultado } from "@/app/apostas/actions";

interface Props {
  categoriaId: string;
  categoriaNome: string;
  tipo: "CATEGORICA" | "NUMERICA";
  temporada: string;
  animesDisponiveis: Anime[];
  onClose: () => void;
}

export default function AdminResultModal({
  categoriaId,
  categoriaNome,
  tipo,
  temporada,
  animesDisponiveis,
  onClose,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [selectedAnime, setSelectedAnime] = useState<string | null>(null);
  const [valorNumerico, setValorNumerico] = useState("");

  function handleConfirm() {
    startTransition(async () => {
      if (tipo === "CATEGORICA") {
        await registrarResultado(categoriaId, temporada, selectedAnime, null);
      } else {
        await registrarResultado(
          categoriaId,
          temporada,
          null,
          parseFloat(valorNumerico)
        );
      }
      onClose();
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={() => !pending && onClose()}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-2xl bg-surface backdrop-blur-md border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/10 shrink-0">
          <p className="text-[10px] uppercase tracking-wider text-text-secondary">
            Resultado Real
          </p>
          <h3 className="font-heading font-bold text-lg">{categoriaNome}</h3>
        </div>

        <div className="px-6 py-5 overflow-y-auto">
          {tipo === "CATEGORICA" ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {animesDisponiveis.map((anime) => {
                const isSelected = selectedAnime === anime.id;
                return (
                  <button
                    key={anime.id}
                    type="button"
                    onClick={() => setSelectedAnime(isSelected ? null : anime.id)}
                    className={`group text-left transition-transform ${
                      isSelected ? "scale-[1.02]" : "hover:scale-[1.02]"
                    }`}
                  >
                    <div
                      className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-base/40 border-2 transition-colors ${
                        isSelected
                          ? "border-accent shadow-lg shadow-accent/30"
                          : "border-white/10 group-hover:border-white/30"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={anime.capaUrl}
                        alt={anime.titulo}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-accent text-base flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <p className="mt-1.5 text-[10px] text-text-secondary truncate">
                      {anime.titulo}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              <label className="block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-2">
                Nota real (0-10)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={valorNumerico}
                onChange={(e) => setValorNumerico(e.target.value)}
                className="w-full rounded-lg bg-base/60 border border-white/10 focus:border-accent outline-none px-4 py-3 text-lg text-text-primary transition-colors"
                placeholder="Ex: 8.5"
              />
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/10 shrink-0 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:border-white/30 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={
              pending ||
              (tipo === "CATEGORICA" && !selectedAnime) ||
              (tipo === "NUMERICA" && !valorNumerico)
            }
            className="rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold px-5 py-2 text-sm transition-colors disabled:opacity-40"
          >
            {pending ? "Calculando..." : "Confirmar Resultado"}
          </button>
        </div>
      </div>
    </div>
  );
}