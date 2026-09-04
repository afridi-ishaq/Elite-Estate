-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "images" TEXT[],
ALTER COLUMN "propertyType" DROP NOT NULL,
ALTER COLUMN "propertyType" DROP DEFAULT;
