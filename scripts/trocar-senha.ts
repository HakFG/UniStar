import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ⚠️ Edita aqui antes de rodar
const NOVAS_SENHAS: Record<string, string> = {
  nandao: "nova-senha-do-nandao",
  pedrao: "nova-senha-do-pedrao",
  heitor: "nova-senha-do-heitor",
};

async function main() {
  for (const [username, senha] of Object.entries(NOVAS_SENHAS)) {
    const hash = await bcrypt.hash(senha, 10);
    await prisma.user.update({
      where: { username },
      data: { password: hash },
    });
    console.log(`✓ ${username} → senha atualizada`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });