-- AlterTable
ALTER TABLE "EventRegistration" ADD COLUMN     "checkedInByUserId" TEXT,
ADD COLUMN     "checkedInDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "tries" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_checkedInByUserId_fkey" FOREIGN KEY ("checkedInByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
