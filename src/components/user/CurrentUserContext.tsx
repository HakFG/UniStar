"use client";

import { useSession } from "next-auth/react";

interface CurrentUserValue {
  username: string | null;
  nome: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Hook que expõe o usuário logado de forma simples.
 * Internamente usa a session do NextAuth — os componentes que consomem
 * não precisam saber disso.
 */
export function useCurrentUser(): CurrentUserValue {
  const { data: session, status } = useSession();

  return {
    username: session?.user?.username ?? null,
    nome: session?.user?.nome ?? null,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}

// Stub pra não quebrar imports antigos do Provider (removido)
export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}