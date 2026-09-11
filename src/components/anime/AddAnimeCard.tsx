import Link from "next/link";

export default function AddAnimeCard() {
  return (
    <Link href="/animes-da-temporada/novo" className="group block">
      <div className="w-full aspect-[3/4] rounded-xl border-2 border-dashed border-white/15 hover:border-accent/60 bg-surface/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(95,212,208,0.15)]">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border border-white/15 group-hover:border-accent/60 flex items-center justify-center mx-auto mb-2.5 text-xl text-text-secondary group-hover:text-accent transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(95,212,208,0.3)]">
            +
          </div>
          <p className="font-heading font-semibold text-[10px] sm:text-xs text-text-secondary group-hover:text-accent transition-colors duration-300">
            Adicionar Anime
          </p>
        </div>
      </div>
    </Link>
  );
}
