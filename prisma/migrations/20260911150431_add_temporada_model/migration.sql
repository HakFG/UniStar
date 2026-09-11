-- CreateTable
CREATE TABLE "Temporada" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "isAtual" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Temporada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Temporada_nome_key" ON "Temporada"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Temporada_ordem_key" ON "Temporada"("ordem");
