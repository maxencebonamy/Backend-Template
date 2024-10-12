/*
  Warnings:

  - Added the required column `illustration` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "illustration" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL;
