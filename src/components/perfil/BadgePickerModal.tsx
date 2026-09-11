"use client";

import { useState, useTransition } from "react";
import type { Badge } from "@prisma/client";
import {
  atribuirBadge,
  removerBadge,
  criarBadge,
} from "@/app/perfil/actions";
import { useToast } from "@/components/ui/ToastProvider";

interface Props {
  username: string;
  badgesAtuais: string[];
  todasBadges: Badge[];
  onClose: () => void;
}

export default function BadgePickerModal({
  username,
  badgesAtuais,
  todasBadges,
  onClose,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [tab, setTab] = useState<"atribuir" | "criar">("atribuir");
  const { success, error: toastError } = useToast();

  function toggle(badgeId: string, tem: boolean, nome: string) {
    startTransition(async () => {
      try {
        if (tem) {
          await removerBadge(username, badgeId);
          success("Badge removida", `${nome} saiu do perfil.`);
        } else {
          await atribuirBadge(username, badgeId);
          success("Badge atribuída!", `${nome} adicionada.`);
        }
      } catch (err) {
        toastError(
          "Não deu pra atualizar",
          err instanceof Error ? err.message : "Tente novamente."
        );
      }
    });
  }

  function handleCriar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    startTransition(async () => {
      try {
        await criarBadge(fd);
        form.reset();
        success("Badge criada!", "Aparece agora pra todo mundo.");
      } catch (err) {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={() => !pending && onClose()}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] rounded-2xl bg-surface backdrop-blur-md border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/10 shrink-0 flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg">Badges</h3>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setTab("atribuir")}
              className={`px-3 py-1.5 text-xs font-heading font-semibold rounded-full transition-colors ${
                tab === "atribuir"
                  ? "bg-accent/15 text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Atribuir
            </button>
            <button
              type="button"
              onClick={() => setTab("criar")}
              className={`px-3 py-1.5 text-xs font-heading font-semibold rounded-full transition-colors ${
                tab === "criar"
                  ? "bg-accent/15 text-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Nova
            </button>
          </div>
        </div>

        <div className="overflow-y-auto">
          {tab === "atribuir" ? (
            <div className="p-6">
              {todasBadges.length === 0 ? (
                <p className="text-center text-text-secondary text-sm py-8">
                  Nenhuma badge disponível.
                </p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {todasBadges.map((b) => {
                    const tem = badgesAtuais.includes(b.id);
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => toggle(b.id, tem, b.nome)}
                        disabled={pending}
                        className="group text-left transition-transform hover:scale-[1.02] disabled:opacity-50"
                      >
                        <div
                          className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                            tem
                              ? "border-accent shadow-lg shadow-accent/30"
                              : "border-white/10 group-hover:border-white/30 opacity-50 group-hover:opacity-100"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={b.imagemUrl}
                            alt={b.nome}
                            className="w-full h-full object-cover"
                          />
                          {tem && (
                            <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-accent text-base flex items-center justify-center text-xs font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                        <p className="mt-1.5 text-[10px] text-text-secondary truncate">
                          {b.nome}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleCriar} className="p-6 flex flex-col gap-4">
              <div>
                <label className={labelCls}>Nome *</label>
                <input
                  name="nome"
                  required
                  className={inputCls}
                  placeholder="Ex: Mestre dos Magos"
                />
              </div>
              <div>
                <label className={labelCls}>URL da imagem (quadrada) *</label>
                <input
                  name="imagemUrl"
                  required
                  className={inputCls}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className={labelCls}>Descrição</label>
                <input
                  name="descricao"
                  className={inputCls}
                  placeholder="Como se ganha essa badge"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold px-6 py-2.5 text-sm transition-colors disabled:opacity-50"
                >
                  {pending ? "Criando..." : "Criar Badge"}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/10 shrink-0 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-primary hover:border-white/30 transition-colors disabled:opacity-50"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}