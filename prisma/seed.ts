import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ─── Usuários ────────────────────────────────
  const usuarios = [
    { username: "nandao", password: "TROCAR_DEPOIS", nome: "Nandão" },
    { username: "pedrao", password: "TROCAR_DEPOIS", nome: "Pedrão" },
    { username: "heitor", password: "TROCAR_DEPOIS", nome: "Heitor" },
  ];

  for (const u of usuarios) {
    await prisma.user.upsert({
      where: { username: u.username },
      update: {},
      create: u,
    });
  }

  // ─── Categorias ──────────────────────────────
  const categorias = [
    { slug: "anime_da_temporada",    nome: "Anime da Temporada",    ordem: 1, tipo: "CATEGORICA" as const },
    { slug: "melhor_avaliado",       nome: "Melhor Avaliado",       ordem: 2, tipo: "NUMERICA"   as const },
    { slug: "melhor_opening",        nome: "Melhor Opening",        ordem: 3, tipo: "CATEGORICA" as const },
    { slug: "melhor_ending",         nome: "Melhor Ending",         ordem: 4, tipo: "CATEGORICA" as const },
    { slug: "surpresa_da_temporada", nome: "Surpresa da Temporada", ordem: 5, tipo: "CATEGORICA" as const },
    { slug: "pior_da_temporada",     nome: "Pior da Temporada",     ordem: 6, tipo: "CATEGORICA" as const },
  ];

  for (const c of categorias) {
    await prisma.categoria.upsert({
      where: { slug: c.slug },
      update: { nome: c.nome, ordem: c.ordem, tipo: c.tipo },
      create: c,
    });
  }

  // ─── Badges ──────────────────────────────────
  const badges = [
    { slug: "fundador",       nome: "Fundador",       descricao: "Membro fundador do União Nandão", imagemUrl: "https://placehold.co/200x200/5FD4D0/0B0D17?text=%E2%98%85", ordem: 1 },
    { slug: "primeiro_lugar", nome: "Primeiro Lugar", descricao: "Venceu uma temporada de apostas", imagemUrl: "https://placehold.co/200x200/B23A6E/F1F0F5?text=1%C2%BA", ordem: 2 },
    { slug: "apostador_nato", nome: "Apostador Nato", descricao: "Acertou 100% em uma categoria",  imagemUrl: "https://placehold.co/200x200/5B2A86/F1F0F5?text=100", ordem: 3 },
    { slug: "critico",        nome: "Crítico",        descricao: "Assistiu todos os animes",       imagemUrl: "https://placehold.co/200x200/1B4B5A/F1F0F5?text=%F0%9F%91%81", ordem: 4 },
    { slug: "streak",         nome: "Streak",         descricao: "3 acertos consecutivos",        imagemUrl: "https://placehold.co/200x200/B23A6E/F1F0F5?text=%F0%9F%94%A5", ordem: 5 },
    { slug: "vidente",        nome: "Vidente",        descricao: "Acertou a nota real exata",      imagemUrl: "https://placehold.co/200x200/5FD4D0/0B0D17?text=%F0%9F%94%AE", ordem: 6 },
  ];

  for (const b of badges) {
    await prisma.badge.upsert({
      where: { slug: b.slug },
      update: { nome: b.nome, descricao: b.descricao, imagemUrl: b.imagemUrl, ordem: b.ordem },
      create: b,
    });
  }

  // ─── Temporadas ──────────────────────────────
  // ordem = ano * 100 + trimestre (1=Inverno, 2=Primavera, 3=Verão, 4=Outono)
  const temporadas = [
    { nome: "Inverno 2026",   ordem: 202601, isAtual: true  },
    { nome: "Primavera 2026", ordem: 202602, isAtual: false },
    { nome: "Verão 2026",     ordem: 202603, isAtual: false },
    { nome: "Outono 2026",    ordem: 202604, isAtual: false },
    { nome: "Inverno 2027",   ordem: 202701, isAtual: false },
    { nome: "Primavera 2027", ordem: 202702, isAtual: false },
    { nome: "Verão 2027",     ordem: 202703, isAtual: false },
    { nome: "Outono 2027",    ordem: 202704, isAtual: false },
  ];

  for (const t of temporadas) {
    await prisma.temporada.upsert({
      where: { nome: t.nome },
      update: { ordem: t.ordem },
      create: t,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });