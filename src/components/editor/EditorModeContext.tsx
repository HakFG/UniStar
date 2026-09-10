"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "unistar:editor-mode";

interface EditorModeValue {
  isEditor: boolean;
  toggle: () => void;
}

const EditorModeContext = createContext<EditorModeValue | null>(null);

export function EditorModeProvider({ children }: { children: ReactNode }) {
  const [isEditor, setIsEditor] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsEditor(stored === "1");
    } catch {
      /* localStorage indisponível */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, isEditor ? "1" : "0");
    } catch {
      /* noop */
    }
  }, [isEditor, hydrated]);

  return (
    <EditorModeContext.Provider
      value={{ isEditor, toggle: () => setIsEditor((v) => !v) }}
    >
      {children}
    </EditorModeContext.Provider>
  );
}

export function useEditorMode() {
  const ctx = useContext(EditorModeContext);
  if (!ctx) {
    throw new Error("useEditorMode precisa estar dentro de EditorModeProvider");
  }
  return ctx;
}