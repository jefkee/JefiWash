CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_name" VARCHAR(255) NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "user_phone_number" VARCHAR(255) NOT NULL,
    "user_type" "UserType"[] DEFAULT ARRAY['USER']::"UserType"[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "customers" (
    "customer_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customer_first_name" TEXT NOT NULL,
    "customer_last_name" TEXT NOT NULL,
    "customer_address" TEXT NOT NULL,
    "customer_userId" UUID,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "order_date" TIMESTAMP(3) NOT NULL,
    "payment_status" TEXT NOT NULL,
    "customerId" UUID NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "vehicle_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "customerId" UUID NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "files" (
    "file_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "customerId" UUID NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("file_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_id_key" ON "customers"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_id_key" ON "orders"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vehicle_id_key" ON "vehicles"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "files_file_id_key" ON "files"("file_id");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_customer_userId_fkey" FOREIGN KEY ("customer_userId") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;
