-- Record the existing Facebook Lead ID column and unique index.
ALTER TABLE "Lead"
ADD COLUMN "facebookLeadId" TEXT;

CREATE UNIQUE INDEX "Lead_facebookLeadId_key"
ON "Lead"("facebookLeadId");