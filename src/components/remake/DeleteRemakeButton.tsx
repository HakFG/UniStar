"use client";

import { useState, useTransition } from "react";
import { deleteRemake } from "@/app/continuacoes-remakes/actions";
import { useToast } from "@/components/ui/ToastProvider";
import { isRedirectError } from "@/lib/is-redirect-error";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteRemakeButton({ id, titulo }: { id: string; titulo: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { success, error: toastError } = useToast();

  function handleConfirm() {
    startTransition(async () => {
      try {
        await deleteRemake(id);
        success(`"${titulo}" excluido`, "Removido da lista.");
      } catch (err) {
        if (isRedirectError(err)) return;
        toastError("Nao deu pra excluir", err instanceof Error ? err.message : "Tente novamente.");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        aria-label={`Excluir ${titulo}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
        className="w-6 h-6 rounded-full bg-base/85 backdrop-blur-sm border border-white/10 hover:border-red-400/70 hover:shadow-[0_0_8px_rgba(248,113,113,0.3)] flex items-center justify-center text-[11px] text-text-primary hover:text-red-400 transition-all duration-200"
      >
        🗑
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => { e.stopPropagation(); if (!pending) setOpen(false); }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl bg-surface backdrop-blur-md border border-white/10 p-6 shadow-2xl"
              initial={{ scale: 0.95, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading font-bold text-lg mb-2">
                Excluir &quot;{titulo}&quot;?
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                Essa acao nao pode ser desfeita.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={pending}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:border-white/30 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={pending}
                  className="rounded-full bg-red-500/90 hover:bg-red-500 hover:shadow-[0_0_16px_rgba(239,68,68,0.4)] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
                >
                  {pending ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}