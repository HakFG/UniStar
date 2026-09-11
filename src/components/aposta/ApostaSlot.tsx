"use client";

import type { Anime } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import { useCurrentUser } from "@/components/user/CurrentUserContext";

interface Props {
  username: string;
  nome: string;
  anime: Anime | null;
  pontos: number | null;
  onPick: () => void;
}

export default function ApostaSlot({ username, nome, anime, pontos, onPick }: Props) {
  const { isEditor } = useEditorMode();
  const { username: currentUsername } = useCurrentUser();

  const isMe = username === currentUsername;
  const canEdit = isEditor && isMe;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={canEdit ? onPick : undefined}
        disabled={!canEdit}
        className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden border transition-all ${
          anime
            ? "bg-surface border-white/10"
            : "bg-surface/40 border-2 border-dashed border-white/15"
        } ${
          canEdit
            ? "cursor-pointer hover:border-accent/60 hover:scale-[1.03]"
            : "cursor-default"
        }`}
      >
        {anime ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={anime.capaUrl}
              alt={anime.titulo}
              className="w-full h-full object-cover"
            />
            {canEdit && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-heading font-semibold text-accent">
                  Trocar
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {canEdit ? (
              <span className="text-2xl text-text-secondary">+</span>
            ) : (
              <span className="text-xl text-text-secondary/30">—</span>
            )}
          </div>
        )}
      </button>

      <p
        className={`font-heading font-bold text-[10px] sm:text-xs tracking-wider uppercase ${
          isMe ? "text-accent" : "text-text-primary"
        }`}
      >
        {nome}
      </p>

      {pontos !== null && (
        <p className="font-heading font-bold text-[10px] text-accent">
          {pontos} pts
        </p>
      )}
    </div>
  );
}