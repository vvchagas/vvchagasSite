-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN "contactType" TEXT NOT NULL DEFAULT 'email';

-- CreateIndex
CREATE INDEX "ContactMessage_contactType_idx" ON "ContactMessage"("contactType");
