import type { Anime } from "@prisma/client";

export default function AnimeHero({ animes }: { animes: Anime[] }) {
  const featured = animes[0];
  if (!featured) return null;

  return (
    <div className="relative w-full h-36 sm:h-44 md:h-52 rounded-2xl overflow-hidden border border-white/5 mb-6 sm:mb-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={featured.capaUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/60 to-base/20" />

      <div className="relative h-full flex items-center justify-between gap-4 px-6 sm:px-10">
        <div className="min-w-0">
          <p className="text-text-secondary text-[10px] sm:text-xs uppercase tracking-wider mb-1">
            Em destaque
          </p>
          <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl truncate">
            {featured.titulo}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-none">
            Uni<span className="text-accent">Star</span>
          </p>
        </div>
      </div>
    </div>
  );
}