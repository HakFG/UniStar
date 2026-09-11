import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

// Cria uma instância "leve" do Auth.js — só com a config Edge-safe
const { auth } = NextAuth(authConfig);

const ROTAS_PROTEGIDAS = ["/perfil", "/apostas"];
const ROTAS_EDITOR = ["/animes-da-temporada/novo", "/continuacoes-remakes/novo"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const precisaLogin =
    ROTAS_PROTEGIDAS.some((r) => pathname.startsWith(r)) ||
    ROTAS_EDITOR.some((r) => pathname.startsWith(r)) ||
    pathname.endsWith("/editar");

  if (precisaLogin && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};