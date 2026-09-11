"use client";

import { motion } from "framer-motion";
import { GRUPO_USERS } from "@/lib/constants";

interface Previsao {
  username: string;
  data: string;
}

const AVATAR_COLORS: Record<string, string> = {
  nandao: "rgba(95,212,208,0.2)",
  pedrao: "rgba(178,58,110,0.2)",
  heitor: "rgba(91,42,134,0.2)",
};

const AVATAR_BORDER: Record<string, string> = {
  nandao: "rgba(95,212,208,0.5)",
  pedrao: "rgba(178,58,110,0.5)",
  heitor: "rgba(91,42,134,0.5)",
};

export default function PrevisoesCard({ previsoes }: { previsoes: Previsao[] }) {
  const totalComData = previsoes.filter((p) => p.data).length;
  const completo = totalComData === GRUPO_USERS.length;
  const agora = new Date();

  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 shadow-lg shadow-black/30 relative">
      {/* Gradiente de fundo — vibe antecipacao */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(95,212,208,0.07) 0%, rgba(91,42,134,0.08) 50%, transparent 100%)",
        }}
      />

      <div className="relative bg-surface/80 backdrop-blur-md px-6 py-7">
        {/* Titulo com barra decorativa */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-accent to-aurora-purple shrink-0" />
          <h3 className="font-heading font-bold text-base sm:text-lg uppercase tracking-wider text-text-primary">
            Previsao
          </h3>
          {completo && (
            <span className="ml-auto rounded-full bg-accent/15 border border-accent/40 px-2 py-0.5 text-[8px] font-heading font-bold uppercase tracking-wider text-accent">
              Completo
            </span>
          )}
        </div>

        {/* Subtitulo discreto */}
        <p className="text-[10px] text-text-secondary font-heading uppercase tracking-wider mb-6 ml-3">
          Data de estreia prevista
        </p>

        {/* Lista de previsoes com stagger */}
        <ul className="flex flex-col gap-5">
          {GRUPO_USERS.map((u, idx) => {
            const p = previsoes.find((x) => x.username === u.username);
            const temData = Boolean(p?.data);
            const isPast = temData
              ? new Date(p!.data.split("/").reverse().join("-")) < agora
              : false;

            return (
              <motion.li
                key={u.username}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
              >
                {/* Avatar inicial */}
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-heading font-bold text-xs"
                  style={{
                    background: AVATAR_COLORS[u.username] ?? "rgba(255,255,255,0.08)",
                    border: `1px solid ${AVATAR_BORDER[u.username] ?? "rgba(255,255,255,0.15)"}`,
                  }}
                >
                  {u.nome[0]}
                </div>

                {/* Nome + data */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-heading font-semibold uppercase tracking-wider text-text-secondary leading-none mb-1">
                    {u.nome}
                  </p>
                  {temData ? (
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading font-bold text-sm sm:text-base text-accent leading-none">
                        {p!.data}
                      </span>
                      {isPast && (
                        <span className="rounded-full bg-white/8 border border-white/12 px-1.5 py-0.5 text-[8px] font-heading uppercase tracking-wider text-text-secondary opacity-70">
                          prevista
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="font-heading font-bold text-sm text-text-secondary/40 leading-none">
                      —
                    </span>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}