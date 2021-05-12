/*
  Warnings:

  - Added the required column `level` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Level" ADD COLUMN     "level" INTEGER NOT NULL;
