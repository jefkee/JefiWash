/*
  Warnings:

  - You are about to drop the column `photo_data` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `photo_name` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `photo_size` on the `photos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "photos" DROP COLUMN "photo_data",
DROP COLUMN "photo_name",
DROP COLUMN "photo_size";
