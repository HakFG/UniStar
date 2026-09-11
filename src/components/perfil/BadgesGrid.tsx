"use client";

import { useState } from "react";
import type { Badge, UserBadge } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import BadgePickerModal from "./BadgePickerModal";

interface UserBadgeWithBadge extends UserBadge {
  badge: Badge;
}

interface Props {
  username: string;
  badges: UserBadgeWithBadge[];
  todasBadges: Badge[];
}

export default function BadgesGrid({ username, badges, todasBadges }: Props) {
  const { isEditor } = useEditorMode();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <div className="rounded-3xl bg-surface backdrop-blur-md border border-white/10 p-5 sm:p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wider text-text-primary">
            Badges
          </h2>
          {isEditor && (
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="text-[10px] sm:text-xs font-heading font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              + Gerenciar
            </button>
          )}
        </div>

        {badges.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-8">
            <p className="text-xs text-text-secondary text-center">
              Nenhuma badge ainda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {badges.map((ub) => (
              <div key={ub.id} className="group">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-white/10 bg-base/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ub.badge.imagemUrl}
                    alt={ub.badge.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {pickerOpen && (
        <BadgePickerModal
          username={username}
          badgesAtuais={badges.map((b) => b.badgeId)}
          todasBadges={todasBadges}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </>
  );
}