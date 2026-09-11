"use client";

import { useState } from "react";
import type { Badge, UserBadge } from "@prisma/client";
import { useEditorMode } from "@/components/editor/EditorModeContext";
import BadgePickerModal from "./BadgePickerModal";
import { motion, AnimatePresence } from "framer-motion";

interface UserBadgeWithBadge extends UserBadge {
  badge: Badge;
}

interface Props {
  username: string;
  badges: UserBadgeWithBadge[];
  todasBadges: Badge[];
}

const STAGGER_DELAY = 0.07;

export default function BadgesGrid({ username, badges, todasBadges }: Props) {
  const { isEditor } = useEditorMode();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // IDs das badges ja conquistadas
  const conquistadasIds = new Set(badges.map((ub) => ub.badgeId));

  return (
    <>
      <motion.div
        className="rounded-3xl bg-surface backdrop-blur-md border border-white/10 p-5 sm:p-6 h-full flex flex-col relative overflow-hidden"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 16px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Gradiente decorativo no canto */}
        <div
          className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 100% 0%, rgba(95,212,208,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-accent to-aurora-purple shrink-0" />
            <h2 className="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wider text-text-primary">
              Badges
            </h2>
          </div>
          {isEditor && (
            <motion.button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="text-[10px] sm:text-xs font-heading font-semibold text-accent hover:text-white hover:bg-accent/20 rounded-full px-2.5 py-1 border border-accent/30 hover:border-accent transition-all duration-200"
              animate={{ boxShadow: ["0 0 0px rgba(95,212,208,0)", "0 0 8px rgba(95,212,208,0.4)", "0 0 0px rgba(95,212,208,0)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              + Gerenciar
            </motion.button>
          )}
        </div>

        {/* Grid de badges */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 relative z-10 flex-1">
          {/* Badges conquistadas com stagger */}
          {badges.map((ub, idx) => (
            <motion.div
              key={ub.id}
              className="group relative"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: idx * STAGGER_DELAY,
                ease: [0.16, 1, 0.3, 1],
              }}
              onHoverStart={() => setHoveredId(ub.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <motion.div
                className="relative w-full aspect-square rounded-lg overflow-hidden border border-white/10 bg-base/40 cursor-pointer"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
                style={
                  hoveredId === ub.id
                    ? { boxShadow: "0 0 0 1.5px rgba(95,212,208,0.6), 0 8px 20px rgba(95,212,208,0.25)" }
                    : {}
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ub.badge.imagemUrl}
                  alt={ub.badge.nome}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Tooltip com nome da badge */}
              <AnimatePresence>
                {hoveredId === ub.id && (
                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="rounded-full bg-base/90 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[9px] font-heading font-semibold text-text-primary">
                      {ub.badge.nome}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Badges locked (silhueta fantasma) — todas as badges que o user nao tem */}
          {todasBadges
            .filter((b) => !conquistadasIds.has(b.id))
            .map((badge, idx) => (
              <motion.div
                key={`locked-${badge.id}`}
                className="group relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: (badges.length + idx) * STAGGER_DELAY * 0.5,
                }}
                onHoverStart={() => setHoveredId(`locked-${badge.id}`)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-white/5 bg-base/20 cursor-default">
                  {/* Imagem da badge em silhueta fantasma */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={badge.imagemUrl}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.12, filter: "grayscale(1)" }}
                  />
                  {/* "?" central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-text-secondary/30 font-heading font-bold text-lg select-none">
                      ?
                    </span>
                  </div>
                </div>

                {/* Tooltip locked */}
                <AnimatePresence>
                  {hoveredId === `locked-${badge.id}` && (
                    <motion.div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap pointer-events-none"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span className="rounded-full bg-base/90 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[9px] font-heading font-semibold text-text-secondary/60">
                        🔒 {badge.nome}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

          {/* Estado completamente vazio (sem badges conquistadas E sem badges no sistema) */}
          {badges.length === 0 && todasBadges.length === 0 && (
            <div className="col-span-full flex-1 flex items-center justify-center py-8">
              <p className="text-xs text-text-secondary text-center">
                Nenhuma badge ainda.
              </p>
            </div>
          )}
        </div>
      </motion.div>

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