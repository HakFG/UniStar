-- CreateEnum
CREATE TYPE "TipoCategoria" AS ENUM ('CATEGORICA', 'NUMERICA');

-- AlterTable
ALTER TABLE "Aposta" ADD COLUMN     "pontos" INTEGER,
ADD COLUMN     "valorNumerico" DOUBLE PRECISION,
ADD COLUMN     "watched" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "tipo" "TipoCategoria" NOT NULL DEFAULT 'CATEGORICA';

-- CreateTable
CREATE TABLE "ResultadoCategoria" (
    "id" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "temporada" TEXT NOT NULL,
    "animeId" TEXT,
    "valorNumerico" DOUBLE PRECISION,
    "fechadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResultadoCategoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResultadoCategoria_categoriaId_temporada_key" ON "ResultadoCategoria"("categoriaId", "temporada");

-- AddForeignKey
ALTER TABLE "ResultadoCategoria" ADD CONSTRAINT "ResultadoCategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoCategoria" ADD CONSTRAINT "ResultadoCategoria_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
