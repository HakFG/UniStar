import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const ROTAS_PROTEGIDAS = [
  "/perfil",
  "/apostas",
];

const ROTAS_EDITOR = [
  "/animes-da-temporada/novo",
  "/continuacoes-remakes/novo",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // /login: se já logado, redireciona pra home
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Rotas que exigem login
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
  matcher: [
    // Ignora arquivos estáticos e rotas internas do Next
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};