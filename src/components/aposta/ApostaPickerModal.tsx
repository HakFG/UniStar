"use client";

import { useState, useTransition } from "react";
import type { Anime } from "@prisma/client";
import { setAposta } from "@/app/apostas/actions";
import { useToast } from "@/components/ui/ToastProvider";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  categoriaId: string;
  categoriaNome: string;
  tipo: "CATEGORICA" | "NUMERICA";
  username: string;
  temporada: string;
  animesDisponiveis: Anime[];
  temAposta: boolean;
  onClose: () => void;
}

export default function ApostaPickerModal({
  categoriaId, categoriaNome, tipo, username, temporada, animesDisponiveis, temAposta, onClose,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<string | null>(null);
  const [valorNumerico, setValorNumerico] = useState("");
  const [watched, setWatched] = useState(true);
  const { success, error: toastError } = useToast();

  function handleConfirm() {
    startTransition(async () => {
      try {
        if (tipo === "CATEGORICA") {
          if (!selected) return;
          await setAposta(categoriaId, username, temporada, selected, null, watched);
        } else {
          const num = parseFloat(valorNumerico);
          if (isNaN(num)) return;
          await setAposta(categoriaId, username, temporada, null, num, watched);
        }
        success("Aposta salva!", `${categoriaNome} registrada.`);
        onClose();
      } catch (err) {
        toastError("Nao deu pra salvar", err instanceof Error ? err.message : "Tente novamente.");
      }
    });
  }

  function handleClear() {
    startTransition(async () => {
      try {
        await setAposta(categoriaId, username, temporada, null, null, true);
        success("Aposta removida", `Voce saiu de ${categoriaNome}.`);
        onClose();
      } catch (err) {
        toastError("Nao deu pra remover", err instanceof Error ? err.message : "Tente novamente.");
      }
    });
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => !pending && onClose()}
    >
      <motion.div
        className="w-full max-w-3xl max-h-[90vh] rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        style={{ background: "rgba(18,15,30,0.95)" }}
        initial={{ scale: 0.95, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 16, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/8 shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(95,212,208,0.06) 0%, transparent 60%)" }} />
          <p className="text-[10px] uppercase tracking-wider text-text-secondary">{categoriaNome}</p>
          <h3 className="font-heading font-bold text-lg relative z-10">
            {temAposta ? "Trocar aposta" : "Fazer aposta"}
          </h3>
        </div>

        {/* Corpo */}
        <div className="px-6 py-5 overflow-y-auto">
          {tipo === "CATEGORICA" ? (
            animesDisponiveis.length === 0 ? (
              <p className="text-center text-text-secondary text-sm py-8">
                Nenhum anime cadastrado nesta temporada.
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {animesDisponiveis.map((anime) => {
                  const isSelected = selected === anime.id;
                  return (
                    <button
                      key={anime.id}
                      type="button"
                      onClick={() => setSelected(isSelected ? null : anime.id)}
                      className="group text-left"
                    >
                      <div
                        className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-base/40 border-2 transition-all duration-250"
                        style={
                          isSelected
                            ? { borderColor: "rgba(95,212,208,0.8)", boxShadow: "0 0 20px rgba(95,212,208,0.3)" }
                            : { borderColor: "rgba(255,255,255,0.1)" }
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={anime.capaUrl} alt={anime.titulo}
                          className={`w-full h-full object-cover transition-all duration-300 ${isSelected ? "brightness-110" : "group-hover:brightness-105"}`} />
                        {/* Overlay hover */}
                        {!isSelected && (
                          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-lg transition-colors duration-200" />
                        )}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-accent flex items-center justify-center font-bold text-sm text-base"
                              style={{ boxShadow: "0 0 12px rgba(95,212,208,0.6)" }}
                            >
                              ✓
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="mt-1.5 text-[10px] text-text-secondary truncate group-hover:text-text-primary transition-colors">
                        {anime.titulo}
                      </p>
                    </button>
                  );
                })}
              </div>
            )
          ) : (
            <div>
              <label className="block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-2">
                Sua nota (0-10)
              </label>
              <input
                type="number" step="0.1" min="0" max="10"
                value={valorNumerico}
                onChange={(e) => setValorNumerico(e.target.value)}
                className="w-full rounded-lg bg-base/60 border border-white/10 focus:border-accent outline-none px-4 py-3 text-lg text-text-primary transition-colors"
                placeholder="Ex: 8.5"
              />
            </div>
          )}

          <label className="flex items-center gap-2 mt-5 cursor-pointer">
            <input type="checkbox" checked={watched} onChange={(e) => setWatched(e.target.checked)} className="w-4 h-4 accent-[#5FD4D0]" />
            <span className="text-xs text-text-secondary">
              Eu assisti esse anime (se nao, seus pontos de precisao caem pela metade)
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8 shrink-0 flex items-center justify-between gap-3">
          <div>
            {temAposta && (
              <button type="button" onClick={handleClear} disabled={pending}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-text-secondary hover:text-red-400 hover:border-red-400/60 transition-colors disabled:opacity-50">
                Remover aposta
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} disabled={pending}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:border-white/30 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button type="button" onClick={handleConfirm}
              disabled={pending || (tipo === "CATEGORICA" && !selected) || (tipo === "NUMERICA" && !valorNumerico)}
              className="rounded-full bg-accent hover:bg-accent/90 hover:shadow-[0_0_16px_rgba(95,212,208,0.4)] text-base font-heading font-semibold px-5 py-2 text-sm transition-all duration-200 disabled:opacity-40">
              {pending ? "Salvando..." : "Confirmar"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}