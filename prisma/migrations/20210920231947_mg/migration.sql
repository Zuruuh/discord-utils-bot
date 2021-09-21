/*
  Warnings:

  - You are about to alter the column `guildId` on the `Guild` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `guildId` on the `UserInfo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "Guild" ALTER COLUMN "guildId" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "UserInfo" ALTER COLUMN "guildId" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(32);
