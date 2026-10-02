-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'WHATSAPP_ALERT';

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "whatsappAlertedAt" TIMESTAMP(3);
