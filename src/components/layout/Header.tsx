"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import EditorModeToggle from "@/components/editor/EditorModeToggle";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="relative z-40 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center gap-3 sm:gap-4 px-4 sm:px-8 py-3">
        {/* LOGO */}
        <Link
          href="/"
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-surface backdrop-blur-sm flex items-center justify-center font-heading font-bold text-[9px] tracking-wider text-text-primary hover:border-accent transition-colors"
        >
          LOGO
        </Link>

        {/* Nav pills — scrolláveis em telas apertadas */}
        <nav className="flex-1 flex items-center justify-center gap-2 overflow-x-auto scrollbar-hidden">
          {NAV_LINKS.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-full border px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-heading font-semibold text-center leading-tight transition-colors whitespace-nowrap ${
                  active
                    ? "bg-accent/15 border-accent text-accent"
                    : "bg-surface border-white/10 text-text-primary hover:border-accent/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Modo Editor + USUARIO */}
        <div className="shrink-0 flex items-center gap-2">
          <EditorModeToggle />
          <Link
            href="/perfil"
            aria-label="Ver perfil"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-surface backdrop-blur-sm flex items-center justify-center font-heading font-semibold text-[9px] tracking-wider text-text-primary hover:border-accent transition-colors"
          >
            USUARIO
          </Link>
        </div>
      </div>
    </header>
  );
}