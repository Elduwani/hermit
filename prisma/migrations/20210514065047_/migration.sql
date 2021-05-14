/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `majorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Course` table. All the data in the column will be lost.
  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `facultyId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `majorId` on the `Department` table. All the data in the column will be lost.
  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Lecturer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `departmentId` on the `Lecturer` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Lecturer` table. All the data in the column will be lost.
  - The primary key for the `Major` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `departmentId` on the `Major` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Major` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `majorId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `facultyId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[major]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `faculty` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty` to the `Lecturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty` to the `Major` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_majorId_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_majorId_fkey";

-- DropIndex
DROP INDEX "Student_majorId_unique";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "majorId",
DROP COLUMN "departmentId",
ADD COLUMN     "major" TEXT,
ADD COLUMN     "department" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Course_id_seq";

-- AlterTable
ALTER TABLE "Department" DROP CONSTRAINT "Department_pkey",
DROP COLUMN "facultyId",
DROP COLUMN "majorId",
ADD COLUMN     "faculty" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Department_id_seq";

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Faculty_id_seq";

-- AlterTable
ALTER TABLE "Lecturer" DROP CONSTRAINT "Lecturer_pkey",
DROP COLUMN "departmentId",
DROP COLUMN "facultyId",
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "faculty" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Lecturer_id_seq";

-- AlterTable
ALTER TABLE "Major" DROP CONSTRAINT "Major_pkey",
DROP COLUMN "departmentId",
DROP COLUMN "facultyId",
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "faculty" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Major_id_seq";

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "majorId",
DROP COLUMN "departmentId",
DROP COLUMN "facultyId",
ADD COLUMN     "major" TEXT,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "faculty" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Student_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Student_major_unique" ON "Student"("major");

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("major") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("department") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD FOREIGN KEY ("faculty") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD FOREIGN KEY ("department") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecturer" ADD FOREIGN KEY ("faculty") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD FOREIGN KEY ("department") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD FOREIGN KEY ("faculty") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("major") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("department") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("faculty") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
