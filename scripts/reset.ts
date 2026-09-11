import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n🧹  RESET GERAL — UniStar");
  console.log("─────────────────────────────\n");

  // 1. Apaga todas as apostas
  const apostas = await prisma.aposta.deleteMany();
  console.log(`   ✓ Apostas removidas:        ${apostas.count}`);

  // 2. Apaga todos os resultados
  const resultados = await prisma.resultadoCategoria.deleteMany();
  console.log(`   ✓ Resultados removidos:     ${resultados.count}`);

  // 3. Zera a pontuação de todos os usuários
  const users = await prisma.user.updateMany({
    data: { pontuacao: 0 },
  });
  console.log(`   ✓ Usuários zerados:         ${users.count}`);

  console.log("\n─────────────────────────────");
  console.log("✨  Reset concluído com sucesso!\n");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("\n❌ Erro no reset:", e);
    await prisma.$disconnect();
    process.exit(1);
  });