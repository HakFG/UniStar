// Temporada ativa do guia (Animes da Temporada)
export const CURRENT_SEASON = "Inverno 2026";

// Categoria usada internamente para Continuações/Remakes
// (não pertence a uma temporada específica, mas o campo temporada é obrigatório)
export const REMAKE_CATEGORY = "Geral";

// Limite de caracteres da sinopse (validação de formulário)
export const SINOPSE_MAX_CHARS = 600;

// Links de navegação principais
export const NAV_LINKS = [
  { href: "/animes-da-temporada", label: "Animes da Temporada" },
  { href: "/continuacoes-remakes", label: "Continuações ou Remakes" },
  { href: "/apostas", label: "Apostas dos Donos" },
] as const;

// Usuário padrão (temporário até o Sistema de Contas entrar)
export const DEFAULT_USERNAME = "nandao";

// Os 3 integrantes fixos do grupo — usado pelo formulário de previsões
export const GRUPO_USERS = [
  { username: "nandao", nome: "Nandão" },
  { username: "pedrao", nome: "Pedrão" },
  { username: "heitor", nome: "Heitor" },
] as const;

