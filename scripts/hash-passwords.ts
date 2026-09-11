import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("\n🔐  Hasheando senhas dos usuários...\n");

  const SENHA_PADRAO = "unistar123";
  const hash = await bcrypt.hash(SENHA_PADRAO, 10);

  const users = await prisma.user.findMany();

  for (const user of users) {
    if (user.password.startsWith("$2")) {
      console.log(`   — ${user.username} já hasheada, pulando`);
      continue;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hash },
    });

    console.log(`   ✓ ${user.username} → senha: ${SENHA_PADRAO}`);
  }

  console.log("\n✨  Senhas atualizadas!\n");
  console.log(`   Todos os 3 podem logar com: ${SENHA_PADRAO}`);
  console.log("   (depois cada um troca quando o sistema de troca existir)\n");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });