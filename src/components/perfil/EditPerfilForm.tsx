"use client";

import { useState, useTransition } from "react";
import type { User } from "@prisma/client";
import { atualizarPerfil } from "@/app/perfil/actions";
import { useToast } from "@/components/ui/ToastProvider";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import ImageUploadInput from "@/components/ui/ImageUploadInput";

interface Props {
  user: User;
  onCancel: () => void;
}

export default function EditPerfilForm({ user, onCancel }: Props) {
  const [pending, startTransition] = useTransition();
  const [dirty, setDirty] = useState(false);
  const { success, error: toastError } = useToast();
  useUnsavedChanges(dirty);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await atualizarPerfil(user.username, fd);
        setDirty(false);
        success("Perfil atualizado!", "Suas mudanças foram salvas.");
        onCancel();
      } catch (err) {
        toastError(
          "Não deu pra salvar",
          err instanceof Error ? err.message : "Tente de novo em alguns segundos."
        );
      }
    });
  }

  const inputCls =
    "w-full rounded-lg bg-base/60 border border-white/10 focus:border-accent outline-none px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors";
  const labelCls =
    "block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      onInput={() => setDirty(true)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          defaultValue={user.nome}
          className={inputCls}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={user.bio ?? ""}
          className={inputCls + " resize-none"}
          placeholder="Uma frase sobre você..."
        />
      </div>

      <div className="sm:col-span-2">
        <ImageUploadInput
          name="avatarUrl"
          label="Avatar (PNG com fundo transparente)"
          defaultValue={user.avatarUrl}
          placeholder="https://... ou envie uma imagem"
        />
      </div>

      <div className="sm:col-span-2">
        <ImageUploadInput
          name="bannerUrl"
          label="Banner"
          defaultValue={user.bannerUrl}
          placeholder="https://... ou envie uma imagem"
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