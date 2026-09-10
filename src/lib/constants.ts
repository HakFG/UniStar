// Temporada ativa — MOCK por enquanto. Depois vira config no banco.
export const CURRENT_SEASON = "Inverno 2026";

// Limite de caracteres da sinopse (validação de formulário)
export const SINOPSE_MAX_CHARS = 600;

// Links de navegação principais (usados no Header)
export const NAV_LINKS = [
  { href: "/animes-da-temporada", label: "Animes da Temporada" },
  { href: "/continuacoes-remakes", label: "Continuações ou Remakes" },
  { href: "/apostas", label: "Apostas dos Donos" },
] as const;

// Usuário usado como "logado" enquanto o sistema de contas não existe.
// Qualquer um dos 3 pode editar tudo (decisão do grupo).
export const DEFAULT_USERNAME = "nandao";