"use client";

import { useEffect, useState, useTransition } from "react";
import type { Anime, Temporada } from "@prisma/client";
import CoverCarouselItem from "./CoverCarouselItem";
import { setTemporadaSelecionada } from "@/app/temporada-actions";

const GROUP_SIZE = 3;
const ROTATE_MS = 6000;

interface Props {
  animes: Anime[];
  temporada: string;
  temporadas: Temporada[];
  temporadaAtual: string;
}

export default function SeasonHighlight({
  animes,
  temporada,
  temporadas,
  temporadaAtual,
}: Props) {
  const [startIndex, setStartIndex] = useState(0);
  const [pending, startTransition] = useTransition();

  // Reseta o índice quando muda de temporada
  useEffect(() => {
    setStartIndex(0);
  }, [temporada]);

  // Rotação automática
  useEffect(() => {
    if (animes.length <= GROUP_SIZE) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => {
      setStartIndex((i) => (i + GROUP_SIZE) % animes.length);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, [animes.length]);

  function trocarTemporada(nome: string) {
    if (nome === temporada) return;
    startTransition(async () => {
      // Salva no cookie — persiste mesmo se sair e voltar
      await setTemporadaSelecionada(nome);
    });
  }

  const visible = Array.from(
    { length: Math.min(GROUP_SIZE, animes.length) },
    (_, k) => animes[(startIndex + k) % animes.length]
  );

  const isAtual = temporada === temporadaAtual;

  return (
    <section>
      <div className="flex items-center gap-3 mb-0.5 flex-wrap">
        {/* Dropdown de temporada estilizado como título */}
        <div className="relative group">
          <select
            value={temporada}
            onChange={(e) => trocarTemporada(e.target.value)}
            disabled={pending}
            className="appearance-none cursor-pointer font-heading font-bold text-lg sm:text-xl md:text-2xl text-text-primary bg-transparent border-none outline-none pr-6 hover:text-accent transition-colors disabled:opacity-60"
            aria-label="Escolher temporada"
          >
            {temporadas.map((t) => (
              <option key={t.id} value={t.nome}>
                {t.nome}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary text-xs group-hover:text-accent transition-colors">
            ▾
          </span>
        </div>

        {isAtual && (
          <span className="shrink-0 rounded-full bg-accent/15 border border-accent/40 px-2 py-0.5 text-[9px] font-heading font-semibold text-accent uppercase tracking-wider">
            Atual
          </span>
        )}

        {pending && (
          <span className="text-text-secondary text-[10px] animate-pulse">
            carregando...
          </span>
        )}
      </div>

      <p className="text-text-secondary text-[10px] sm:text-[11px] mb-2.5">
        Destaques da temporada
      </p>

      {animes.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-white/10 bg-surface/30 py-12 text-center">
          <p className="text-text-secondary text-sm">
            Nenhum anime cadastrado nesta temporada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {visible.map((a) => (
            <CoverCarouselItem
              key={a.id}
              title={a.titulo}
              coverUrl={a.capaUrl}
              href={`/animes-da-temporada/${a.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}