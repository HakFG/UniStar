"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-surface backdrop-blur-md border border-white/10 p-8 text-center shadow-2xl shadow-black/50">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xl font-bold">
          ✕
        </div>

        <h1 className="font-heading font-bold text-2xl mb-2">
          Algo deu errado
        </h1>
        <p className="text-text-secondary text-sm mb-6 leading-relaxed">
          Não consegui carregar essa página. Pode ser algo temporário — tenta
          de novo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold px-5 py-2.5 text-sm transition-colors"
          >
            Tentar de novo
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-text-primary hover:border-white/30 transition-colors"
          >
            Ir pra Home
          </Link>
        </div>
      </div>
    </main>
  );
}