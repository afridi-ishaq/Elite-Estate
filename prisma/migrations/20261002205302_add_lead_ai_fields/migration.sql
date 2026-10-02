-- CreateEnum
CREATE TYPE "LeadTemperature" AS ENUM ('HOT', 'WARM', 'COLD');

-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'AI_ANALYZED';

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "aiAnalyzedAt" TIMESTAMP(3),
ADD COLUMN     "aiRecommendation" TEXT,
ADD COLUMN     "aiScore" INTEGER,
ADD COLUMN     "aiSummary" TEXT,
ADD COLUMN     "aiTemperature" "LeadTemperature";
