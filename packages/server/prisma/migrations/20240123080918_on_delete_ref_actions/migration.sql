-- DropForeignKey
ALTER TABLE "EmployeePosition" DROP CONSTRAINT "EmployeePosition_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "EmployeePosition" ADD CONSTRAINT "EmployeePosition_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
