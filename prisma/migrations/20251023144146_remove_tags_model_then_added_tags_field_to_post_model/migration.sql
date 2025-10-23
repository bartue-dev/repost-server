/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Tags" DROP CONSTRAINT "Tags_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tags" DROP CONSTRAINT "Tags_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "public"."Tags";
