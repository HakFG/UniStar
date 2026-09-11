# CLAUDE.md — Constituição do Projeto UniStar

> Este arquivo é um contrato. Leia antes de qualquer alteração. Se algo aqui
> conflitar com o que o usuário pedir, pergunte antes de agir.

---

## 1. Contexto do projeto

UniStar é um site pessoal para 3 amigos (Nandão, Heitor, Pedrão) que
compartilham animes, apostas e pontuação. Está **funcionalmente completo**.
O objetivo desta fase é **polish visual** — deixar o site mais bonito,
com animações refinadas e identidade visual mais forte.

**Nada de reescrever arquitetura. Nada de mudar comportamento. Só polir.**

---

## 2. Stack técnica (NÃO trocar)

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (config via `@theme` no `globals.css`, **não tem `tailwind.config.ts`**)
- Framer Motion
- Prisma 6 + PostgreSQL (Neon)
- NextAuth v5 (Auth.js)
- UploadThing (uploads de imagem)

---

## 3. Zonas PROIBIDAS (não tocar sem pedir permissão explícita)

### Arquitetura e dados
- ❌ `prisma/schema.prisma`
- ❌ `prisma/migrations/**`
- ❌ `src/lib/prisma.ts`
- ❌ `src/lib/auth.ts`
- ❌ `src/auth.config.ts`
- ❌ `src/lib/session.ts`
- ❌ `src/middleware.ts`
- ❌ `src/app/api/**` (rotas de API)
- ❌ `src/app/**/actions.ts` (server actions)
- ❌ `src/lib/is-redirect-error.ts`
- ❌ `src/lib/uploadthing.ts` e `src/app/api/uploadthing/**`

### Hooks e contextos (comportamento)
- ❌ `src/components/editor/EditorModeContext.tsx` (só o visual do toggle pode mudar)
- ❌ `src/components/ui/ToastProvider.tsx` (só o visual dos toasts pode mudar, não a API)
- ❌ `src/hooks/useUnsavedChanges.ts`

### Estrutura de layout
- ❌ Não converter **Server Components** em Client Components
- ❌ Não mover arquivos de lugar
- ❌ Não renomear rotas
- ❌ Não remover o `AuroraBackground` (é a identidade do projeto)

---

## 4. O que PODE ser alterado livremente

### Visual puro
- ✅ `src/app/globals.css` — **CUIDADO**: o bloco `@theme` define as cores base.
  Pode adicionar animações, keyframes, utilitários. Pode ajustar os valores das
  cores, mas **mantenha a paleta coerente** (fundo escuro + aurora roxa/teal/magenta).
- ✅ Classes Tailwind dentro dos componentes (`className="..."`)
- ✅ Novos componentes visuais em `src/components/ui/`
- ✅ Animações com Framer Motion (dentro dos componentes que já são `"use client"`)

### Comportamento preservado
- ✅ Adicionar hovers, transições, micro-interações
- ✅ Adicionar animações de entrada (Framer Motion)
- ✅ Adicionar efeitos visuais (glow, gradiente, textura, etc)
- ✅ Melhorar tipografia, espaçamento, hierarquia visual

---

## 5. Regras de estilo

### Paleta (já definida em `@theme`)
- Fundo base: `#0B0D17`
- Aurora: roxo `#5B2A86`, teal `#1B4B5A`, magenta `#B23A6E`
- Texto primário: `#F1F0F5` · Texto secundário: `#A9A6B8`
- Accent: ciano `#5FD4D0`
- Superfície de cards: `rgba(20, 18, 32, 0.55)` + backdrop-blur

**Não invente novas cores fora dessa paleta.** Se quiser uma cor nova,
justifique e peça aprovação.

### Tipografia
- Títulos: `font-heading` (Space Grotesk)
- Corpo: `font-body` (Inter)

### Movimento
- Respeitar `prefers-reduced-motion` em toda animação
- Animações sutis > animações chamativas
- Duração típica: 200-400ms para hovers, 500-900ms para entradas

---

## 6. Estrutura de componentes (mapa mental)
src/
├─ app/
│ ├─ page.tsx → Home (server)
│ ├─ layout.tsx → Layout global (server)
│ ├─ error.tsx / not-found.tsx / loading.tsx
│ ├─ login/ → Tela de login
│ ├─ animes-da-temporada/
│ │ ├─ page.tsx → Grade (server)
│ │ ├─ loading.tsx
│ │ └─ [id]/
│ │ ├─ page.tsx → Página individual
│ │ └─ editar/page.tsx
│ ├─ continuacoes-remakes/ → Espelho de animes
│ ├─ apostas/ → Página de apostas
│ ├─ perfil/[username]/ → Perfil
│ └─ temporadas/ → Histórico
├─ components/
│ ├─ layout/Header.tsx → Header global
│ ├─ home/ → Componentes da Home
│ ├─ anime/ → Componentes de animes
│ ├─ remake/ → Componentes de remakes
│ ├─ aposta/ → Componentes de apostas
│ ├─ perfil/ → Componentes de perfil
│ ├─ auth/ → Login
│ ├─ editor/ → Modo Editor
│ ├─ user/ → UserMenu
│ └─ ui/ → Genéricos (Toast, Skeleton, ImageUploadInput)

text

---

## 7. Fluxo de trabalho

Cada "bloco" de polish foca em **uma página/área de cada vez**. O usuário
vai te pedir um bloco, você faz APENAS aquele bloco, o usuário testa, aprova,
e só depois vai pro próximo.

**Nunca faça várias páginas de uma vez.** Nunca refatore "de brinde" outras
coisas que você viu pelo caminho.

---

## 8. O que NUNCA fazer

- ❌ Trocar a stack ou libs
- ❌ Mudar o schema do banco
- ❌ Mexer em autenticação
- ❌ Alterar server actions (mesmo que pareçam "feias")
- ❌ Remover features existentes (toasts, modais, editor mode, etc)
- ❌ Transformar component server em client
- ❌ Adicionar dependências novas sem pedir permissão
- ❌ Mudar a paleta base
- ❌ Trocar fonte sem aprovação
- ❌ Refatorar código "porque ficou melhor" — só polish visual

---

## 9. Ao terminar cada bloco

Sempre me diga:
1. **Lista de arquivos alterados**
2. **O que mudou visualmente** em cada um
3. **O que NÃO foi tocado** (pra eu confirmar que você respeitou as regras)
4. **Como testar** — em quais telas/breakpoints olhar

---

## 10. Se estiver em dúvida

**Pergunte.** Não assuma. Especialmente se a mudança cruza alguma zona
proibida da seção 3.