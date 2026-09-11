"use client";

import { useEffect } from "react";

/**
 * Avisa o usuário (via diálogo nativo do browser) antes de:
 * - Fechar a aba
 * - Recarregar a página
 * - Navegar pra fora do app
 *
 * Uso: passe um booleano que representa "tem alterações não salvas".
 */
export function useUnsavedChanges(isDirty: boolean) {
  useEffect(() => {
    if (!isDirty) return;

    function handler(e: BeforeUnloadEvent) {
      e.preventDefault();
      // Precisa de returnValue em alguns navegadores antigos
      e.returnValue = "";
    }

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);
}