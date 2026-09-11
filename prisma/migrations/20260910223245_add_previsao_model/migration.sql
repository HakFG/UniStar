-- CreateTable
CREATE TABLE "Previsao" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Previsao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Previsao_animeId_userId_key" ON "Previsao"("animeId", "userId");

-- AddForeignKey
ALTER TABLE "Previsao" ADD CONSTRAINT "Previsao_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Previsao" ADD CONSTRAINT "Previsao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
