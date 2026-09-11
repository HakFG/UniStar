"use client";

import { useState } from "react";
import type { User } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import { useCurrentUser } from "@/components/user/CurrentUserContext";
import { calcularLevel, corDoLevel } from "@/lib/levels";
import EditPerfilForm from "./EditPerfilForm";

export default function ProfileHeader({ user }: { user: User }) {
  const { isEditor } = useEditorMode();
  const { username: currentUsername } = useCurrentUser();
  const [editing, setEditing] = useState(false);

  const isMe = user.username === currentUsername;
  const canEdit = isEditor && isMe;
  const level = calcularLevel(user.pontuacao);

  return (
    <div>
      {/* Bloco único com o PNG emergindo */}
      <div className="relative">
        {/* Card de fundo */}
        <div className="relative rounded-3xl bg-surface backdrop-blur-md border border-white/10 min-h-[220px] sm:min-h-[260px] flex">
          {/* Info à esquerda */}
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 z-10">
            <div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
                {user.nome}
              </h1>
              {user.bio && (
                <p className="text-text-secondary text-sm sm:text-base mt-3 sm:mt-4 max-w-xl leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>

            <div className="flex items-baseline gap-2 mt-6">
              <span className="font-heading font-bold text-3xl sm:text-4xl tracking-tight">
                LV
              </span>
              <span
                className={`font-heading font-bold text-4xl sm:text-5xl leading-none ${corDoLevel(level)}`}
              >
                {level}
              </span>
            </div>
          </div>

          {/* Espaço reservado pro PNG não cobrir o texto */}
          <div className="shrink-0 w-[32%] sm:w-[30%] max-w-[230px]" />

          {/* Botão Editar */}
          {canEdit && !editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="absolute top-4 right-4 z-30 rounded-full border border-white/10 bg-base/70 backdrop-blur-sm px-3 py-1.5 text-[10px] sm:text-xs font-heading font-semibold text-text-primary hover:border-accent hover:text-accent transition-colors"
            >
              ✎ Editar
            </button>
          )}
        </div>

        {/* PNG do avatar — encosta na borda inferior, sem cobrir */}
        <div className="absolute -bottom-[-1px] right-6 sm:right-10 top-[-35px] sm:top-[-50px] w-[30%] sm:w-[27%] max-w-[225px] flex items-end justify-center pointer-events-none z-20">
          {user.avatarUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={user.avatarUrl}
              alt={user.nome}
              className="w-full h-full object-contain object-bottom drop-shadow-2xl select-none"
            />
          ) : (
            <div
              className="w-[70%] aspect-[3/4] rounded-t-full"
              style={{
                background:
                  "linear-gradient(180deg, #5B2A86 0%, #1B4B5A 100%)",
                opacity: 0.5,
              }}
            />
          )}
        </div>
      </div>

      {/* Form de edição inline */}
      {editing && (
        <div className="mt-5 rounded-3xl bg-surface backdrop-blur-md border border-white/10 p-5">
          <EditPerfilForm user={user} onCancel={() => setEditing(false)} />
        </div>
      )}
    </div>
  );
}