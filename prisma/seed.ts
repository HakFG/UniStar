import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      { username: 'nandao', password: 'TROCAR_DEPOIS', nome: 'Nandão' },
      { username: 'pedrao', password: 'TROCAR_DEPOIS', nome: 'Pedrão' },
      { username: 'heitor', password: 'TROCAR_DEPOIS', nome: 'Heitor' },
    ],
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })