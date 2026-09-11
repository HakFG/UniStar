"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCurrentUser } from "./CurrentUserContext";

export default function UserSwitcher() {
  const { username, nome, avatarUrl, users, setUsername } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

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
        aria-label="Trocar usuário"
        className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-surface backdrop-blur-sm overflow-hidden hover:border-accent transition-colors flex items-center justify-center"
      >
        {avatarUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatarUrl}
            alt={nome}
            className="w-full h-full object-contain p-0.5"
          />
        ) : (
          <span className="font-heading font-semibold text-[11px] tracking-wider text-text-primary">
            {initials}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-surface backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-[10px] uppercase tracking-wider text-text-secondary">
              Agindo como
            </p>
          </div>

          {users.map((u) => {
            const active = u.username === username;
            const uInitials = u.nome
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <button
                key={u.username}
                type="button"
                onClick={() => {
                  setUsername(u.username as typeof username);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-accent/15 text-accent font-semibold"
                    : "text-text-primary hover:bg-white/5"
                }`}
              >
                {/* Avatar pequeno no dropdown */}
                <div className="w-8 h-8 rounded-full border border-white/10 bg-surface/60 overflow-hidden flex items-center justify-center shrink-0">
                  {u.avatarUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={u.avatarUrl}
                      alt={u.nome}
                      className="w-full h-full object-contain p-0.5"
                    />
                  ) : (
                    <span className="font-heading font-semibold text-[10px] tracking-wider">
                      {uInitials}
                    </span>
                  )}
                </div>
                <span>{u.nome}</span>
              </button>
            );
          })}

          <Link
            href="/perfil"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-text-secondary border-t border-white/5 hover:bg-white/5 transition-colors"
          >
            Ver perfil →
          </Link>
        </div>
      )}
    </div>
  );
}