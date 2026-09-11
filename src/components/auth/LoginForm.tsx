"use client";

import { useState, useTransition } from "react";
import { authenticate } from "@/app/login/actions";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await authenticate(fd);
      if (result?.error) setError(result.error);
    });
  }

  const inputCls =
    "w-full rounded-lg bg-base/60 border border-white/10 focus:border-accent outline-none px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors";
  const labelCls =
    "block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-1.5";

  return (
    <div className="w-full max-w-sm rounded-3xl bg-surface backdrop-blur-md border border-white/10 p-8 shadow-2xl shadow-black/50">
      <div className="text-center mb-8">
<img
  src="/Unistar_Nick.png"
  alt="UniStar"
  className="w-40 sm:w-48 h-auto object-contain mx-auto"
/>
        <p className="text-text-secondary text-xs mt-2">
          Entre com seu usuário
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelCls} htmlFor="username">
            Usuário
          </label>
          <input
            id="username"
            name="username"
            required
            autoComplete="username"
            className={inputCls}
            placeholder="nandao / pedrao / heitor"
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputCls}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-400 text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold py-3 text-sm transition-colors disabled:opacity-50"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}