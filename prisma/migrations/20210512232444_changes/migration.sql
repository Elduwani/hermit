/*
  Warnings:

  - You are about to drop the column `levelId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_levelId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "levelId",
ADD COLUMN     "level" INTEGER;

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("level") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
