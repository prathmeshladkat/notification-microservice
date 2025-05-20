-- AlterEnum
ALTER TYPE "Channel" ADD VALUE 'WHATSAPP';

-- AlterTable
ALTER TABLE "NotificationRequest" ADD COLUMN     "whatsapp" TEXT;
