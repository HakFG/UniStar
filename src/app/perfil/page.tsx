"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/components/user/CurrentUserContext";
import Header from "@/components/layout/Header";

export default function PerfilRedirect() {
  const router = useRouter();
  const { username } = useCurrentUser();

  useEffect(() => {
    router.replace(`/perfil/${username}`);
  }, [username, router]);

  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center py-32 text-text-secondary text-sm">
        Carregando perfil...
      </div>
    </main>
  );
}