import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROTAS_PROTEGIDAS = ["/perfil", "/apostas"];
const ROTAS_EDITOR = [
  "/animes-da-temporada/novo",
  "/continuacoes-remakes/novo",
];

// Nomes dos cookies de sessão do NextAuth v5
// (varia entre dev e prod)
const COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

function temSessao(req: NextRequest): boolean {
  return COOKIE_NAMES.some((name) => req.cookies.has(name));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = temSessao(req);

  // /login: se já logado, redireciona pra home
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
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};