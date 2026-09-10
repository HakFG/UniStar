"use client";

import { useEditorMode } from "./EditorModeContext";

export default function EditorModeToggle() {
  const { isEditor, toggle } = useEditorMode();

  return (
    <button
      onClick={toggle}
      aria-pressed={isEditor}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] sm:text-xs font-heading font-semibold transition-colors ${
        isEditor
          ? "bg-accent/15 border-accent text-accent"
          : "bg-surface border-white/10 text-text-secondary hover:border-white/20"
      }`}
    >
      <span className="hidden sm:inline">Modo Editor: </span>
      <span>{isEditor ? "ON" : "OFF"}</span>
    </button>
  );
}