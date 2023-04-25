-- AlterEnum
ALTER TYPE "UseCase" ADD VALUE 'PHV';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false;
