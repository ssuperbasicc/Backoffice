-- DropForeignKey
ALTER TABLE "AuthHistory" DROP CONSTRAINT "AuthHistory_uid_fkey";

-- AddForeignKey
ALTER TABLE "AuthHistory" ADD CONSTRAINT "AuthHistory_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
