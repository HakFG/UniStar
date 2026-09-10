"use client";

import { useState, useTransition } from "react";
import { deleteAnime } from "@/app/animes-da-temporada/actions";

export default function DeleteAnimeButton({
  id,
  titulo,
}: {
  id: string;
  titulo: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await deleteAnime(id);
    });
  }

  return (
    <>
      <button
        type="button"
        aria-label="Excluir"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="w-8 h-8 rounded-full bg-base/85 backdrop-blur-sm border border-white/10 hover:border-red-400 flex items-center justify-center text-sm text-text-primary hover:text-red-400 transition-colors"
      >
        🗑
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => {
            e.stopPropagation();
            if (!pending) setOpen(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-surface backdrop-blur-md border border-white/10 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading font-bold text-lg mb-2">
              Excluir &quot;{titulo}&quot;?
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Essa ação não pode ser desfeita.
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
                {pending ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}