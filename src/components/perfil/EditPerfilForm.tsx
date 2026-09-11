"use client";

import { useTransition } from "react";
import type { User } from "@prisma/client";
import { atualizarPerfil } from "@/app/perfil/actions";

interface Props {
  user: User;
  onCancel: () => void;
}

export default function EditPerfilForm({ user, onCancel }: Props) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await atualizarPerfil(user.username, fd);
      onCancel();
    });
  }

  const inputCls =
    "w-full rounded-lg bg-base/60 border border-white/10 focus:border-accent outline-none px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors";
  const labelCls =
    "block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="nome">Nome</label>
        <input id="nome" name="nome" defaultValue={user.nome} className={inputCls} />
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={user.bio ?? ""}
          className={inputCls + " resize-none"}
          placeholder="Uma frase sobre você..."
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="avatarUrl">URL do avatar (PNG)</label>
        <input
          id="avatarUrl"
          name="avatarUrl"
          defaultValue={user.avatarUrl ?? ""}
          className={inputCls}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="bannerUrl">URL do banner</label>
        <input
          id="bannerUrl"
          name="bannerUrl"
          defaultValue={user.bannerUrl ?? ""}
          className={inputCls}
          placeholder="https://..."
        />
      </div>

      <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={pending}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:border-white/30 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold px-6 py-2.5 text-sm transition-colors disabled:opacity-50"
        >
          {pending ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}