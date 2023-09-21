/*
  Warnings:

  - Changed the type of `hourRate` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dayRate` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `monthRate` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "hourRate",
ADD COLUMN     "hourRate" INTEGER NOT NULL,
DROP COLUMN "dayRate",
ADD COLUMN     "dayRate" INTEGER NOT NULL,
DROP COLUMN "monthRate",
ADD COLUMN     "monthRate" INTEGER NOT NULL;
