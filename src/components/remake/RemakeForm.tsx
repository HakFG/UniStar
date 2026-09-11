"use client";

import { useState, useTransition } from "react";
import type { Anime } from "@prisma/client";
import { GRUPO_USERS } from "@/lib/constants";
import { useToast } from "@/components/ui/ToastProvider";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { isRedirectError } from "@/lib/is-redirect-error";
import ImageUploadInput from "@/components/ui/ImageUploadInput";

interface PrevisaoInicial {
  username: string;
  data: string;
}

interface Props {
  mode: "create" | "edit";
  initialData?: Anime;
  initialPrevisoes?: PrevisaoInicial[];
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function RemakeForm({
  mode,
  initialData,
  initialPrevisoes,
  onSubmit,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [dirty, setDirty] = useState(false);
  const { success, error: toastError } = useToast();
  useUnsavedChanges(dirty);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await onSubmit(fd);
        setDirty(false);
        success(
          mode === "create" ? "Remake criado!" : "Alterações salvas!",
          "Tudo certo com o cadastro."
        );
      } catch (err) {
        if (isRedirectError(err)) return;
        toastError(
          "Não deu pra salvar",
          err instanceof Error ? err.message : "Tente de novo em alguns segundos."
        );
      }
    });
  }

  function valorPrevisao(username: string) {
    return initialPrevisoes?.find((p) => p.username === username)?.data ?? "";
  }

  const inputCls =
    "w-full rounded-lg bg-base/60 border border-white/10 focus:border-accent outline-none px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors";
  const labelCls =
    "block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      onInput={() => setDirty(true)}
      className="flex flex-col gap-5"
    >
      <div>
        <label className={labelCls} htmlFor="titulo">
          Título *
        </label>
        <input
          id="titulo"
          name="titulo"
          required
          defaultValue={initialData?.titulo ?? ""}
          className={inputCls}
          placeholder="Ex: Frieren 2ª Temporada"
        />
      </div>

      <ImageUploadInput
        name="tituloImgUrl"
        label="PNG do título (opcional)"
        defaultValue={initialData?.tituloImgUrl}
        placeholder="https://... (deixe vazio para usar texto)"
      />

      <ImageUploadInput
        name="capaUrl"
        label="Capa"
        defaultValue={initialData?.capaUrl}
        required
      />

      <fieldset className="flex flex-col gap-3">
        <legend className={labelCls}>Previsões de estreia</legend>
        <p className="text-xs text-text-secondary -mt-1 mb-1">
          Cada integrante aposta quando o remake/continuação sai. Pode deixar
          em branco.
        </p>

        {GRUPO_USERS.map((u) => (
          <div key={u.username}>
            <label
              className="block text-xs text-text-secondary mb-1"
              htmlFor={`previsao_${u.username}`}
            >
              {u.nome}
            </label>
            <input
              id={`previsao_${u.username}`}
              name={`previsao_${u.username}`}
              defaultValue={valorPrevisao(u.username)}
              className={inputCls}
              placeholder="Ex: Janeiro 2026, Primeiro semestre, etc."
            />
          </div>
        ))}
      </fieldset>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold px-6 py-2.5 text-sm transition-colors disabled:opacity-50"
        >
          {pending
            ? "Salvando..."
            : mode === "create"
              ? "Criar Remake"
              : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}