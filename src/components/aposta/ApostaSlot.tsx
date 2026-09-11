"use client";

import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import { useCurrentUser } from "@/components/user/CurrentUserContext";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedScore from "@/components/ui/AnimatedScore";

interface Props {
  username: string;
  nome: string;
  anime: Anime | null;
  pontos: number | null;
  acertou?: boolean;
  errou?: boolean;
  onPick: () => void;
}

export default function ApostaSlot({ username, nome, anime, pontos, acertou, errou, onPick }: Props) {
  const { isEditor } = useEditorMode();
  const { username: currentUsername } = useCurrentUser();

  const isMe = username === currentUsername;
  const canEdit = isEditor && isMe;

  // Borda e aparência baseadas no estado
  const borderStyle = acertou
    ? "border-2 border-accent shadow-[0_0_12px_rgba(95,212,208,0.35)]"
    : errou
    ? "border border-red-500/25"
    : anime
    ? "border border-white/10"
    : canEdit
    ? "border-2 border-dashed border-white/20"
    : "border-2 border-dashed border-white/10";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={canEdit ? onPick : undefined}
        disabled={!canEdit}
        className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden transition-all duration-300 ${borderStyle} ${
          canEdit ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(95,212,208,0.2)]" : "cursor-default"
        } ${errou ? "opacity-55" : ""}`}
        style={{ background: anime ? undefined : "rgba(20,18,32,0.4)" }}
      >
        {anime ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={anime.capaUrl} alt={anime.titulo} className="w-full h-full object-cover" />

            {/* Badge de resultado */}
            <AnimatePresence>
              {acertou && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[9px] font-bold text-base z-10"
                  style={{ boxShadow: "0 0 8px rgba(95,212,208,0.6)" }}
                >
                  ✓
                </motion.div>
              )}
              {errou && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/80 flex items-center justify-center text-[9px] font-bold text-white z-10"
                >
                  ✗
                </motion.div>
              )}
            </AnimatePresence>

            {/* Overlay "Trocar" quando editavel */}
            {canEdit && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-heading font-semibold text-accent">Trocar</span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {canEdit ? (
              <motion.span
                className="text-2xl text-text-secondary"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                +
              </motion.span>
            ) : (
              <span className="text-xl text-text-secondary/30">—</span>
            )}
          </div>
        )}
      </button>

      {/* Nome — accent quando e voce */}
      <p className={`font-heading font-bold text-[10px] sm:text-xs tracking-wider uppercase ${isMe ? "text-accent" : "text-text-primary"}`}>
        {nome}
      </p>

      {/* Pontos com count-up curto */}
      {pontos !== null && pontos > 0 && (
        <AnimatedScore
          value={pontos}
          duration={800}
          className="font-heading font-bold text-[10px] text-accent"
          suffix=" pts"
        />
      )}
      {pontos === 0 && acertou === false && errou && (
        <span className="font-heading font-bold text-[10px] text-red-400/60">0 pts</span>
      )}
    </div>
  );
}