"use client";

import { useTransition } from "react";
import type { Temporada } from "@prisma/client";
import {
  definirTemporadaAtual,
  criarTemporada,
  deletarTemporada,
} from "@/app/admin/temporadas/actions";
import { useToast } from "@/components/ui/ToastProvider";
import { isRedirectError } from "@/lib/is-redirect-error";

export default function TemporadasAdminList({
  temporadas,
}: {
  temporadas: Temporada[];
}) {
  const [pending, startTransition] = useTransition();
  const { success, error: toastError } = useToast();

  function definir(id: string, nome: string) {
    startTransition(async () => {
      try {
        await definirTemporadaAtual(id);
        success("Temporada atual trocada!", `Agora é ${nome}.`);
      } catch (err) {
        if (isRedirectError(err)) return;
        toastError(
          "Não deu pra trocar",
          err instanceof Error ? err.message : "Tente novamente."
        );
      }
    });
  }

  function deletar(id: string, nome: string) {
    if (!confirm(`Deletar a temporada "${nome}"?`)) return;
    startTransition(async () => {
      try {
        await deletarTemporada(id);
        success("Temporada deletada", nome);
      } catch (err) {
        if (isRedirectError(err)) return;
        toastError(
          "Não deu pra deletar",
          err instanceof Error ? err.message : "Tente novamente."
        );
      }
    });
  }

  function criar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      try {
        await criarTemporada(fd);
        form.reset();
        success("Temporada criada!", "Já aparece na lista.");
      } catch (err) {
        if (isRedirectError(err)) return;
        toastError(
          "Não deu pra criar",
          err instanceof Error ? err.message : "Tente novamente."
        );
      }
    });
  }

  const inputCls =
    "w-full rounded-lg bg-base/60 border border-white/10 focus:border-accent outline-none px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors";
  const labelCls =
    "block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-1.5";

  return (
    <div className="flex flex-col gap-6">
      {/* Formulário de criação */}
      <form
        onSubmit={criar}
        className="rounded-2xl bg-surface backdrop-blur-md border border-white/10 p-5"
      >
        <h2 className="font-heading font-bold text-sm uppercase tracking-wider text-text-secondary mb-4">
          Nova temporada
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_auto] gap-3 items-end">
          <div>
            <label className={labelCls}>Nome *</label>
            <input
              name="nome"
              required
              className={inputCls}
              placeholder="Ex: Primavera 2028"
            />
          </div>
          <div>
            <label className={labelCls}>Ordem *</label>
            <input
              name="ordem"
              type="number"
              required
              className={inputCls}
              placeholder="Ex: 202801"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold px-5 py-2.5 text-sm transition-colors disabled:opacity-50"
          >
            {pending ? "..." : "Criar"}
          </button>
        </div>
        <p className="text-[10px] text-text-secondary mt-2">
          Ordem = ano × 100 + trimestre (1=Inverno, 2=Primavera, 3=Verão, 4=Outono).
          Ex: Outono 2026 = 202604.
        </p>
      </form>

      {/* Lista */}
      <div className="rounded-2xl bg-surface backdrop-blur-md border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-base/40">
            <tr>
              <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary">
                Nome
              </th>
              <th className="text-left px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary">
                Ordem
              </th>
              <th className="text-right px-4 py-3 font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {temporadas.map((t) => (
              <tr key={t.id} className="border-t border-white/5">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold">
                      {t.nome}
                    </span>
                    {t.isAtual && (
                      <span className="shrink-0 rounded-full bg-accent/15 border border-accent/40 px-2 py-0.5 text-[9px] font-heading font-semibold text-accent uppercase tracking-wider">
                        Atual
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-text-secondary">{t.ordem}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    {!t.isAtual && (
                      <button
                        type="button"
                        onClick={() => definir(t.id, t.nome)}
                        disabled={pending}
                        className="rounded-full border border-white/10 hover:border-accent hover:text-accent px-3 py-1 text-[10px] font-heading font-semibold transition-colors disabled:opacity-50"
                      >
                        Tornar atual
                      </button>
                    )}
                    {!t.isAtual && (
                      <button
                        type="button"
                        onClick={() => deletar(t.id, t.nome)}
                        disabled={pending}
                        className="rounded-full border border-white/10 hover:border-red-400 hover:text-red-400 px-3 py-1 text-[10px] font-heading font-semibold transition-colors disabled:opacity-50"
                      >
                        Deletar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}