"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (status === "loading") {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-surface/40 animate-pulse" />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-white/10 bg-surface px-3 py-1.5 text-[10px] sm:text-xs font-heading font-semibold text-text-primary hover:border-accent transition-colors"
      >
        Entrar
      </Link>
    );
  }

  const nome = session.user.nome ?? "Usuário";
  const initials = nome
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu do usuário"
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-surface backdrop-blur-sm hover:border-accent transition-colors flex items-center justify-center overflow-hidden"
      >
        <span className="font-heading font-semibold text-[11px] tracking-wider text-text-primary">
          {initials}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-surface backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-[10px] uppercase tracking-wider text-text-secondary">
              Conectado como
            </p>
            <p className="text-sm font-heading font-semibold text-text-primary truncate">
              {nome}
            </p>
          </div>

          {session.user.username === "nandao" && (
  <>
    <Link
      href="/admin/temporadas"
      onClick={() => setOpen(false)}
      className="block px-4 py-2.5 text-sm text-text-primary hover:bg-white/5 transition-colors"
    >
      ⚙️ Temporadas
    </Link>
  </>
)}

          <Link
            href={`/perfil/${session.user.username}`}
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-text-primary hover:bg-white/5 transition-colors"
          >
            Ver perfil
          </Link>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}