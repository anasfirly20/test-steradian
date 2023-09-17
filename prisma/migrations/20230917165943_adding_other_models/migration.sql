-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "pickUpLoc" TEXT NOT NULL,
    "dropOffLoc" TEXT NOT NULL,
    "pickUpDate" TIMESTAMP(3) NOT NULL,
    "dropOffDate" TIMESTAMP(3) NOT NULL,
    "pickUpTime" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "fuel" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "hourRate" TEXT NOT NULL,
    "dayRate" TEXT NOT NULL,
    "monthRate" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
