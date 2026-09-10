"use client";

import Link from "next/link";

const PORTALS = [
  {
    name: "Animes da Temporada",
    href: "/animes-da-temporada",
    imageUrl: "https://files.catbox.moe/hio8cr.png",
  },
  {
    name: "Continuações ou Remakes",
    href: "/continuacoes-remakes",
    imageUrl: "https://files.catbox.moe/4vse4j.png",
  },
  {
    name: "Apostas dos Donos",
    href: "/apostas",
    imageUrl: "https://files.catbox.moe/iianbu.png",
  },
];

export default function NavigationPortals() {
  return (
    <section className="grid grid-cols-3 gap-2 sm:gap-2.5">
      {PORTALS.map((p) => (
        <Link
          key={p.href}
          href={p.href}
          className="group relative flex items-end min-h-[100px] sm:min-h-[130px]"
        >
          {/* Pill empurrado mais pra direita (w menor) e com padding-left extra
              pra afastar o texto do PNG que vem pela esquerda */}
          <div className="relative ml-auto w-[68%] rounded-full bg-surface backdrop-blur-md border border-white/10 group-hover:border-accent/60 py-3 pl-8 pr-3 transition-colors duration-300 flex items-center justify-center">
            <span className="font-heading font-semibold text-[10px] sm:text-xs text-text-primary group-hover:text-accent transition-colors duration-300 text-center leading-tight">
              {p.name}
            </span>
          </div>

          {/* PNG deslocado um pouco mais pra esquerda (left negativo) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.imageUrl}
            alt=""
            aria-hidden="true"
            className="absolute -left-2 bottom-0 h-[110%] w-auto object-contain object-bottom pointer-events-none drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      ))}
    </section>
  );
}