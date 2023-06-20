/*
  Warnings:

  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_customerId_fkey";

-- DropTable
DROP TABLE "files";

-- CreateTable
CREATE TABLE "photos" (
    "photo_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "photo_name" TEXT NOT NULL,
    "photo_path" TEXT NOT NULL,
    "photo_size" INTEGER NOT NULL,
    "customerId" UUID NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "customerId" UUID NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "packages" (
    "package_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "package_name" TEXT NOT NULL,
    "package_description" TEXT NOT NULL,
    "package_price" TEXT NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("package_id")
);

-- CreateTable
CREATE TABLE "order_packages" (
    "order_package_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "orderId" UUID NOT NULL,
    "packageId" UUID,

    CONSTRAINT "order_packages_pkey" PRIMARY KEY ("order_package_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "photos_photo_id_key" ON "photos"("photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_review_id_key" ON "reviews"("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "packages_package_id_key" ON "packages"("package_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_packages_order_package_id_key" ON "order_packages"("order_package_id");

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_packages" ADD CONSTRAINT "order_packages_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_packages" ADD CONSTRAINT "order_packages_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("package_id") ON DELETE SET NULL ON UPDATE CASCADE;
