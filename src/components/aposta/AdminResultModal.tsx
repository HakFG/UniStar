"use client";

import { useState, useTransition } from "react";
import type { Anime } from "@prisma/client";
import { registrarResultado } from "@/app/apostas/actions";
import { useToast } from "@/components/ui/ToastProvider";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  categoriaId: string;
  categoriaNome: string;
  tipo: "CATEGORICA" | "NUMERICA";
  temporada: string;
  animesDisponiveis: Anime[];
  onClose: () => void;
}

export default function AdminResultModal({
  categoriaId, categoriaNome, tipo, temporada, animesDisponiveis, onClose,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [selectedAnime, setSelectedAnime] = useState<string | null>(null);
  const [valorNumerico, setValorNumerico] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const { success, error: toastError } = useToast();

  function handleConfirm() {
    startTransition(async () => {
      try {
        if (tipo === "CATEGORICA") {
          await registrarResultado(categoriaId, temporada, selectedAnime, null);
        } else {
          await registrarResultado(categoriaId, temporada, null, parseFloat(valorNumerico));
        }
        setConfirmed(true);
        setTimeout(() => {
          success("Resultado registrado!", `Pontuacoes de ${categoriaNome} recalculadas.`);
          onClose();
        }, 800);
      } catch (err) {
        toastError("Nao deu pra fechar", err instanceof Error ? err.message : "Tente novamente.");
      }
    });
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => !pending && onClose()}
    >
      <motion.div
        className="w-full max-w-3xl max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        style={{ background: "rgba(14,11,25,0.97)" }}
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header solene */}
        <div className="px-6 py-5 border-b border-white/8 shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(178,58,110,0.08) 0%, rgba(91,42,134,0.06) 60%, transparent 100%)" }} />
          <div className="flex items-center gap-3 relative z-10">
            {/* Icone de selo */}
            <div className="w-9 h-9 rounded-full border border-aurora-magenta/40 bg-aurora-magenta/10 flex items-center justify-center text-lg shrink-0">
              🔒
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-aurora-magenta/80 font-heading font-semibold">
                Fechar Resultado
              </p>
              <h3 className="font-heading font-bold text-lg leading-tight">{categoriaNome}</h3>
            </div>
          </div>
          <p className="text-[10px] text-text-secondary mt-3 relative z-10">
            Esta acao e permanente. Selecione o resultado real para calcular os pontos.
          </p>
        </div>

        {/* Corpo */}
        <div className="px-6 py-5 overflow-y-auto">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 gap-4"
              >
                <div className="text-5xl">🏆</div>
                <p className="font-heading font-bold text-lg text-accent">Resultado registrado!</p>
              </motion.div>
            ) : tipo === "CATEGORICA" ? (
              <motion.div key="grid" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {animesDisponiveis.map((anime) => {
                  const isSelected = selectedAnime === anime.id;
                  return (
                    <button key={anime.id} type="button"
                      onClick={() => setSelectedAnime(isSelected ? null : anime.id)}
                      className="group text-left">
                      <div
                        className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-base/40 border-2 transition-all duration-250"
                        style={isSelected
                          ? { borderColor: "rgba(178,58,110,0.8)", boxShadow: "0 0 20px rgba(178,58,110,0.3)" }
                          : { borderColor: "rgba(255,255,255,0.1)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={anime.capaUrl} alt={anime.titulo}
                          className={`w-full h-full object-cover transition-all duration-300 ${isSelected ? "brightness-110" : "group-hover:brightness-105"}`} />
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm text-white"
                              style={{ background: "rgba(178,58,110,0.9)", boxShadow: "0 0 12px rgba(178,58,110,0.6)" }}
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
              </motion.div>
            ) : (
              <motion.div key="numeric">
                <label className="block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-2">
                  Nota real (0-10)
                </label>
                <input type="number" step="0.1" min="0" max="10"
                  value={valorNumerico} onChange={(e) => setValorNumerico(e.target.value)}
                  className="w-full rounded-lg bg-base/60 border border-white/10 focus:border-aurora-magenta outline-none px-4 py-3 text-lg text-text-primary transition-colors"
                  placeholder="Ex: 8.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!confirmed && (
          <div className="px-6 py-4 border-t border-white/8 shrink-0 flex justify-end gap-3">
            <button type="button" onClick={onClose} disabled={pending}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:border-white/30 transition-colors disabled:opacity-50">
              Cancelar
            </button>
            <button type="button" onClick={handleConfirm}
              disabled={pending || (tipo === "CATEGORICA" && !selectedAnime) || (tipo === "NUMERICA" && !valorNumerico)}
              className="rounded-full font-heading font-bold px-5 py-2 text-sm text-white transition-all duration-200 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #B23A6E, #5B2A86)", boxShadow: pending ? "none" : "0 0 16px rgba(178,58,110,0.3)" }}>
              {pending ? "Calculando..." : "🔒 Confirmar Resultado"}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}