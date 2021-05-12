/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Level` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Level" DROP CONSTRAINT "Level_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Level" DROP CONSTRAINT "Level_studentId_fkey";

-- DropIndex
DROP INDEX "Level_studentId_unique";

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "departmentId",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "levelId" INTEGER;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
