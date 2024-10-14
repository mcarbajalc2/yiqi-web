/*
  Warnings:

  - The values [ONE_DAY_BEFORE,TWO_HOURS_BEFORE,MORNING_OF,PAYMENT_REQUIRED_REMINDER,FORM_SUBMISSION] on the enum `ReminderType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'PDF', 'OTHER');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('GENERATE_EVENT_OPEN_GRAPH', 'COLLECT_USER_DATA');

-- AlterEnum
BEGIN;
CREATE TYPE "ReminderType_new" AS ENUM ('ORG_INVITE', 'RESERVATION_PAYMENT_REMINDER', 'RESERVATION_CONFIRMED', 'RESERVATION_REJECTED', 'RESERVATION_REMINDER');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "ReminderType_new" USING ("type"::text::"ReminderType_new");
ALTER TYPE "ReminderType" RENAME TO "ReminderType_old";
ALTER TYPE "ReminderType_new" RENAME TO "ReminderType";
DROP TYPE "ReminderType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "openGraphImage" TEXT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "extraData" JSONB,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dataCollected" JSONB;

-- CreateTable
CREATE TABLE "GeneratedMedia" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "imageUrl" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueJob" (
    "id" TEXT NOT NULL,
    "type" "JobType" NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "data" JSONB NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "error" TEXT,
    "organizationId" TEXT,
    "eventId" TEXT,
    "userId" TEXT,

    CONSTRAINT "QueueJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QueueJob_status_type_priority_idx" ON "QueueJob"("status", "type", "priority");

-- CreateIndex
CREATE INDEX "QueueJob_createdAt_idx" ON "QueueJob"("createdAt");

-- AddForeignKey
ALTER TABLE "GeneratedMedia" ADD CONSTRAINT "GeneratedMedia_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueJob" ADD CONSTRAINT "QueueJob_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueJob" ADD CONSTRAINT "QueueJob_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueueJob" ADD CONSTRAINT "QueueJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
