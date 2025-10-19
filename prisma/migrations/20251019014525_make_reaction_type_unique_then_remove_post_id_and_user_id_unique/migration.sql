/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Reactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Reactions_postId_key";

-- DropIndex
DROP INDEX "public"."Reactions_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reactions_type_key" ON "Reactions"("type");
