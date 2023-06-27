/*
  Warnings:

  - You are about to drop the column `customerId` on the `photos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_customerId_fkey";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "customerId";
