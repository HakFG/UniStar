import Link from "next/link";

export default function AddAnimeCard() {
  return (
    <Link
      href="/animes-da-temporada/novo"
      className="group block"
    >
      <div className="w-full aspect-[3/4] rounded-xl border-2 border-dashed border-white/15 hover:border-accent/60 bg-surface/40 backdrop-blur-sm flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="text-3xl mb-2 text-text-secondary group-hover:text-accent transition-colors">
            +
          </div>
          <p className="font-heading font-semibold text-xs text-text-secondary group-hover:text-accent transition-colors">
            Adicionar Anime
          </p>
        </div>
      </div>
    </Link>
  );
}