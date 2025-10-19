/*
  Warnings:

  - The `type` column on the `Reactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[postId,userId]` on the table `Reactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('LIKED', 'LOVED', 'APPLAUSE', 'COOL');

-- DropIndex
DROP INDEX "public"."Reactions_type_key";

-- AlterTable
ALTER TABLE "Reactions" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'LIKED';

-- CreateIndex
CREATE UNIQUE INDEX "Reactions_postId_userId_key" ON "Reactions"("postId", "userId");
