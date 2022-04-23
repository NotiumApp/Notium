/*
  Warnings:

  - Added the required column `body` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "body" TEXT NOT NULL;
