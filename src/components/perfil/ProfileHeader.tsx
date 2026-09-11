"use client";

import { useState } from "react";
import type { User } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import { useCurrentUser } from "@/components/user/CurrentUserContext";
import { calcularLevel, corDoLevel } from "@/lib/levels";
import EditPerfilForm from "./EditPerfilForm";
import { motion, AnimatePresence } from "framer-motion";

/** Mapeia a faixa do level pra cor do glow/anel */
function glowColorDoLevel(level: number): string {
  if (level <= 2) return "rgba(169,166,184,0.35)";
  if (level <= 4) return "rgba(95,212,208,0.45)";
  if (level <= 6) return "rgba(91,42,134,0.55)";
  return "rgba(178,58,110,0.55)";
}

function bgColorDoLevel(level: number): string {
  if (level <= 2) return "rgba(169,166,184,0.15)";
  if (level <= 4) return "rgba(95,212,208,0.18)";
  if (level <= 6) return "rgba(91,42,134,0.22)";
  return "rgba(178,58,110,0.22)";
}

export default function ProfileHeader({ user }: { user: User }) {
  const { isEditor } = useEditorMode();
  const { username: currentUsername } = useCurrentUser();
  const [editing, setEditing] = useState(false);

  const isMe = user.username === currentUsername;
  const canEdit = isEditor && isMe;
  const level = calcularLevel(user.pontuacao);
  const glowColor = glowColorDoLevel(level);
  const bgLv = bgColorDoLevel(level);

  return (
    <div>
      {/* Card principal com entrada cinematografica */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Card de fundo — borda com gradiente sutil */}
        <div
          className="relative rounded-3xl backdrop-blur-md min-h-[220px] sm:min-h-[260px] flex overflow-hidden"
          style={{
            background: "rgba(20,18,32,0.6)",
            boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${glowColor}`,
          }}
        >
          {/* Gradiente de profundidade no fundo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 100% at 100% 50%, ${bgLv} 0%, transparent 60%)`,
            }}
          />

          {/* Info a esquerda */}
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 z-10 relative">
            <div>
              {/* Nome com fade+slide */}
              <motion.h1
                className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-tight"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {user.nome}
              </motion.h1>

              {/* Linha decorativa abaixo do nome */}
              <motion.div
                className="mt-2 h-px w-12"
                style={{ background: `linear-gradient(90deg, ${glowColor.replace("0.45","0.8").replace("0.55","0.8").replace("0.35","0.6")} 0%, transparent 100%)` }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />

              {user.bio && (
                <motion.p
                  className="text-text-secondary text-sm sm:text-base mt-3 sm:mt-4 max-w-xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  {user.bio}
                </motion.p>
              )}
            </div>

            {/* LV com "pop" e fundo colorido */}
            <motion.div
              className="flex items-baseline gap-2 mt-6"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-text-secondary">
                LV
              </span>
              {/* Numero do LV com badge colorida */}
              <span
                className={`relative font-heading font-bold text-4xl sm:text-5xl leading-none ${corDoLevel(level)}`}
              >
                {/* Fundo do badge */}
                <span
                  className="absolute inset-0 -inset-x-2 rounded-lg pointer-events-none"
                  style={{ background: bgLv }}
                />
                {/* Shine que passa quando entra */}
                <motion.span
                  className="absolute inset-0 -inset-x-2 rounded-lg pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)",
                  }}
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
                <span className="relative">{level}</span>
              </span>
            </motion.div>
          </div>

          {/* Espaco reservado pro PNG */}
          <div className="shrink-0 w-[32%] sm:w-[30%] max-w-[230px]" />

          {/* Botao Editar */}
          {canEdit && !editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="absolute top-4 right-4 z-30 rounded-full border border-white/10 bg-base/70 backdrop-blur-sm px-3 py-1.5 text-[10px] sm:text-xs font-heading font-semibold text-text-primary hover:border-accent hover:text-accent hover:shadow-[0_0_12px_rgba(95,212,208,0.3)] transition-all duration-200"
            >
              ✎ Editar
            </button>
          )}
        </div>

        {/* Avatar — emerge do escuro com glow atras */}
        <div className="absolute -bottom-[-1px] right-6 sm:right-10 top-[-35px] sm:top-[-50px] w-[30%] sm:w-[27%] max-w-[225px] flex items-end justify-center pointer-events-none z-20">
          {/* Glow radial atras do avatar */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 70% at 50% 80%, ${glowColor} 0%, transparent 70%)`,
              filter: "blur(16px)",
            }}
          />
          <motion.div
            className="w-full h-full flex items-end justify-center"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={user.nome}
                className="w-full h-full object-contain object-bottom select-none"
                style={{ filter: `drop-shadow(0 0 20px ${glowColor})` }}
              />
            ) : (
              <div
                className="w-[70%] aspect-[3/4] rounded-t-full"
                style={{
                  background: "linear-gradient(180deg, #5B2A86 0%, #1B4B5A 100%)",
                  opacity: 0.5,
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Form de edicao inline */}
      <AnimatePresence>
        {editing && (
          <motion.div
            className="mt-5 rounded-3xl bg-surface backdrop-blur-md border border-white/10 p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <EditPerfilForm user={user} onCancel={() => setEditing(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}