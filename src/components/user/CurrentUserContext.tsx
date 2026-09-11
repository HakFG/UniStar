"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_USERNAME, GRUPO_USERS } from "@/lib/constants";

const STORAGE_KEY = "unistar:current-user";

type Username = (typeof GRUPO_USERS)[number]["username"];

interface UserInfo {
  username: string;
  nome: string;
  avatarUrl: string | null;
}

interface CurrentUserValue {
  username: Username;
  nome: string;
  avatarUrl: string | null;
  users: UserInfo[];
  setUsername: (u: Username) => void;
}

const CurrentUserContext = createContext<CurrentUserValue | null>(null);

export function CurrentUserProvider({
  users,
  children,
}: {
  users: UserInfo[];
  children: ReactNode;
}) {
  const [username, setUsernameState] = useState<Username>(DEFAULT_USERNAME);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Username | null;
      const valid = GRUPO_USERS.some((u) => u.username === stored);
      if (stored && valid) setUsernameState(stored);
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, username);
    } catch {
      /* noop */
    }
  }, [username, hydrated]);

  const currentUser = users.find((u) => u.username === username);
  const nome = currentUser?.nome ?? "Nandão";
  const avatarUrl = currentUser?.avatarUrl ?? null;

  return (
    <CurrentUserContext.Provider
      value={{
        username,
        nome,
        avatarUrl,
        users,
        setUsername: setUsernameState,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);
  if (!ctx) {
    throw new Error("useCurrentUser precisa estar em CurrentUserProvider");
  }
  return ctx;
}