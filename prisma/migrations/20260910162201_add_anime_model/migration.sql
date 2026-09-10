-- CreateEnum
CREATE TYPE "TipoIp" AS ENUM ('GUIA_TEMPORADA', 'CONTINUACAO_REMAKE');

-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "tipo" "TipoIp" NOT NULL DEFAULT 'GUIA_TEMPORADA',
    "titulo" TEXT NOT NULL,
    "tituloImgUrl" TEXT,
    "capaUrl" TEXT NOT NULL,
    "sinopse" TEXT,
    "estudio" TEXT,
    "diretor" TEXT,
    "characterDesign" TEXT,
    "compositor" TEXT,
    "adaptador" TEXT,
    "notasNandao" TEXT,
    "trailerUrl" TEXT,
    "temporada" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "criadoPorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
