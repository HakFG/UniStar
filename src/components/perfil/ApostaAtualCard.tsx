import type { Anime } from "@prisma/client";
import Link from "next/link";

interface Props {
  anime: Anime | null;
}

export default function ApostaAtualCard({ anime }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full rounded-full bg-surface backdrop-blur-md border border-white/10 px-4 py-2.5 text-center">
        <h2 className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider text-text-primary">
          Aposta Atual
        </h2>
      </div>

      {anime ? (
        <Link
          href={`/animes-da-temporada/${anime.id}`}
          className="group block"
        >
          <div className="relative w-28 sm:w-32 aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-white/10 shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-[1.03]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={anime.capaUrl}
              alt={anime.titulo}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 text-[10px] sm:text-xs text-text-secondary truncate text-center group-hover:text-accent transition-colors">
            {anime.titulo}
          </p>
        </Link>
      ) : (
        <div className="w-28 sm:w-32 aspect-[3/4] rounded-xl border-2 border-dashed border-white/15 bg-surface/30 flex items-center justify-center">
          <span className="text-xs text-text-secondary/60 text-center px-2">
            Sem aposta
          </span>
        </div>
      )}
    </div>
  );
}