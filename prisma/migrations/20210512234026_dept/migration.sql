-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "departmentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
