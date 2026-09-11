"use client";

import { useTransition } from "react";
import type { Anime } from "@prisma/client";
import { GRUPO_USERS } from "@/lib/constants";

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await onSubmit(fd);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className={labelCls} htmlFor="titulo">Título *</label>
        <input
          id="titulo"
          name="titulo"
          required
          defaultValue={initialData?.titulo ?? ""}
          className={inputCls}
          placeholder="Ex: Frieren 2ª Temporada"
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="tituloImgUrl">
          URL do PNG do título (opcional)
        </label>
        <input
          id="tituloImgUrl"
          name="tituloImgUrl"
          defaultValue={initialData?.tituloImgUrl ?? ""}
          className={inputCls}
          placeholder="https://... (deixe vazio para usar texto)"
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="capaUrl">URL da capa *</label>
        <input
          id="capaUrl"
          name="capaUrl"
          required
          defaultValue={initialData?.capaUrl ?? ""}
          className={inputCls}
          placeholder="https://..."
        />
      </div>

      {/* Previsões */}
      <fieldset className="flex flex-col gap-3">
        <legend className={labelCls}>Previsões de estreia</legend>
        <p className="text-xs text-text-secondary -mt-1 mb-1">
          Cada integrante aposta quando o remake/continuação sai. Pode deixar em branco.
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