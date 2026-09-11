import type { NextAuthConfig } from "next-auth";

/**
 * Configuração base do Auth.js — Edge-compatible.
 * NÃO importa Prisma, bcrypt ou qualquer coisa que dependa de Node.js.
 * É usada APENAS pelo middleware para checar se o usuário está logado.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as { id: string }).id;
        token.username = (user as { username: string }).username;
        token.nome = (user as { nome: string }).nome;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        (session.user as { username?: string }).username =
          token.username as string;
        (session.user as { nome?: string }).nome = token.nome as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;