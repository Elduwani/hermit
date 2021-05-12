/*
  Warnings:

  - You are about to drop the column `email` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course.email_unique";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ALTER COLUMN "majorId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course.name_unique" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Course.code_unique" ON "Course"("code");
