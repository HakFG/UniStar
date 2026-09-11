"use client";

import { useState, useTransition } from "react";
import type { Anime } from "@prisma/client";
import { SINOPSE_MAX_CHARS, CURRENT_SEASON } from "@/lib/constants";
import { useToast } from "@/components/ui/ToastProvider";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { isRedirectError } from "@/lib/is-redirect-error";
import ImageUploadInput from "@/components/ui/ImageUploadInput";

interface Props {
  mode: "create" | "edit";
  initialData?: Anime;
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function AnimeForm({ mode, initialData, onSubmit }: Props) {
  const [sinopse, setSinopse] = useState(initialData?.sinopse ?? "");
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
          mode === "create" ? "Anime criado!" : "Alterações salvas!",
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
          placeholder="Ex: Frieren"
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

      <div>
        <label className={labelCls} htmlFor="sinopse">
          Sinopse ({sinopse.length}/{SINOPSE_MAX_CHARS})
        </label>
        <textarea
          id="sinopse"
          name="sinopse"
          rows={5}
          maxLength={SINOPSE_MAX_CHARS}
          value={sinopse}
          onChange={(e) => setSinopse(e.target.value)}
          className={inputCls + " resize-none"}
          placeholder="Resumo do anime..."
        />
      </div>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <legend className={labelCls}>Staff</legend>
        {[
          { name: "estudio", label: "Estúdio" },
          { name: "diretor", label: "Diretor" },
          { name: "characterDesign", label: "Character Design" },
          { name: "compositor", label: "Compositor" },
          { name: "adaptador", label: "Adaptador" },
        ].map((f) => (
          <div key={f.name}>
            <label className={labelCls} htmlFor={f.name}>
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              defaultValue={
                ((initialData as Record<string, unknown> | undefined)?.[
                  f.name
                ] as string | undefined) ?? ""
              }
              className={inputCls}
            />
          </div>
        ))}
      </fieldset>

      <div>
        <label className={labelCls} htmlFor="notasNandao">
          Notas do Nandão
        </label>
        <textarea
          id="notasNandao"
          name="notasNandao"
          rows={4}
          defaultValue={initialData?.notasNandao ?? ""}
          className={inputCls + " resize-none"}
          placeholder="Comentário livre sobre a produção..."
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="trailerUrl">
          URL do trailer (YouTube)
        </label>
        <input
          id="trailerUrl"
          name="trailerUrl"
          defaultValue={initialData?.trailerUrl ?? ""}
          className={inputCls}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="temporada">
          Temporada *
        </label>
        <input
          id="temporada"
          name="temporada"
          required
          defaultValue={initialData?.temporada ?? CURRENT_SEASON}
          className={inputCls}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold px-6 py-2.5 text-sm transition-colors disabled:opacity-50"
        >
          {pending
            ? "Salvando..."
            : mode === "create"
              ? "Criar Anime"
              : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}