"use client";

import { useState, useTransition } from "react";
import { resetarTudo } from "@/app/apostas/actions";
import { useToast } from "@/components/ui/ToastProvider";

export default function ResetButton() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { success, error: toastError } = useToast();

  function handleConfirm() {
    startTransition(async () => {
      try {
        await resetarTudo();
        success("Tudo resetado", "Apostas, resultados e pontuação zerados.");
        setOpen(false);
      } catch (err) {
        toastError(
          "Não deu pra resetar",
          err instanceof Error ? err.message : "Tente novamente."
        );
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] sm:text-xs font-heading font-semibold text-text-secondary hover:text-red-400 hover:border-red-400/60 transition-colors"
      >
        🧹 Resetar Apostas
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => !pending && setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-surface backdrop-blur-md border border-white/10 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading font-bold text-lg mb-2">
              Resetar tudo?
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Isso vai apagar <strong>todas as apostas</strong>, todos os
              resultados registrados e zerar a pontuação dos 3. Os animes
              cadastrados continuam intactos.
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
                className="rounded-full bg-red-500/90 hover:bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50"
              >
                {pending ? "Resetando..." : "Resetar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}