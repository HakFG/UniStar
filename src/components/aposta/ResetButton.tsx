"use client";

import { useState, useTransition } from "react";
import { resetarTudo } from "@/app/apostas/actions";
import { useToast } from "@/components/ui/ToastProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetButton() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { success, error: toastError } = useToast();

  function handleConfirm() {
    startTransition(async () => {
      try {
        await resetarTudo();
        success("Tudo resetado", "Apostas, resultados e pontuacao zerados.");
        setOpen(false);
      } catch (err) {
        toastError("Nao deu pra resetar", err instanceof Error ? err.message : "Tente novamente.");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] sm:text-xs font-heading font-semibold text-text-secondary hover:text-red-400 hover:border-red-400/60 hover:shadow-[0_0_10px_rgba(239,68,68,0.15)] transition-all duration-200"
      >
        🧹 Resetar Apostas
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => !pending && setOpen(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl backdrop-blur-md border border-white/10 p-6 shadow-2xl"
              style={{ background: "rgba(18,15,30,0.97)", boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 32px 60px rgba(0,0,0,0.7)" }}
              initial={{ scale: 0.93, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 12, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading font-bold text-lg mb-2">Resetar tudo?</h3>
              <p className="text-text-secondary text-sm mb-6">
                Isso vai apagar <strong>todas as apostas</strong>, todos os resultados registrados e
                zerar a pontuacao dos 3. Os animes cadastrados continuam intactos.
              </p>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)} disabled={pending}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:border-white/30 transition-colors disabled:opacity-50">
                  Cancelar
                </button>
                <button type="button" onClick={handleConfirm} disabled={pending}
                  className="rounded-full bg-red-500/90 hover:bg-red-500 hover:shadow-[0_0_16px_rgba(239,68,68,0.4)] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50">
                  {pending ? "Resetando..." : "Resetar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}