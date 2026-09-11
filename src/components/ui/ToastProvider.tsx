"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, "id"> & { duration?: number }) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const STYLES: Record<ToastType, { container: string; icon: string; iconBg: string }> = {
  success: {
    container: "border-accent/40 bg-accent/10",
    icon: "text-accent",
    iconBg: "bg-accent/20",
  },
  error: {
    container: "border-red-400/40 bg-red-500/10",
    icon: "text-red-400",
    iconBg: "bg-red-500/20",
  },
  info: {
    container: "border-white/15 bg-surface/90",
    icon: "text-text-primary",
    iconBg: "bg-white/10",
  },
};

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "i",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: Omit<Toast, "id"> & { duration?: number }) => {
      const id = Math.random().toString(36).slice(2, 11);
      const newToast: Toast = {
        id,
        type: opts.type,
        title: opts.title,
        description: opts.description,
      };
      setToasts((prev) => [...prev, newToast]);

      const duration = opts.duration ?? 3500;
      setTimeout(() => remove(id), duration);
    },
    [remove]
  );

  const success = useCallback(
    (title: string, description?: string) =>
      toast({ type: "success", title, description }),
    [toast]
  );
  const error = useCallback(
    (title: string, description?: string) =>
      toast({ type: "error", title, description, duration: 5000 }),
    [toast]
  );
  const info = useCallback(
    (title: string, description?: string) =>
      toast({ type: "info", title, description }),
    [toast]
  );

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}

      {/* Container fixo dos toasts */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-2rem)] sm:max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const style = STYLES[t.type];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`pointer-events-auto flex items-start gap-3 rounded-2xl border backdrop-blur-md shadow-2xl shadow-black/60 px-4 py-3 w-full ${style.container}`}
              >
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${style.iconBg} ${style.icon}`}
                >
                  {ICONS[t.type]}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-sm leading-tight text-text-primary">
                    {t.title}
                  </p>
                  {t.description && (
                    <p className="text-xs text-text-secondary mt-1 leading-snug">
                      {t.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  aria-label="Fechar aviso"
                  className="shrink-0 text-xs text-text-secondary hover:text-text-primary transition-colors leading-none mt-1"
                >
                  ✕
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast precisa estar dentro de um ToastProvider");
  }
  return ctx;
}