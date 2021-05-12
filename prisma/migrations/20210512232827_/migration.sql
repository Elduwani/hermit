/*
  Warnings:

  - You are about to drop the column `levelId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_levelId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "levelId",
ADD COLUMN     "level" INTEGER;

-- DropTable
DROP TABLE "Level";
