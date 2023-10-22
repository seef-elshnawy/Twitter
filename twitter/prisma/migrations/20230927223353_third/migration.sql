/*
  Warnings:

  - Added the required column `followingId` to the `Followings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerId` to the `Follwers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Followings" ADD COLUMN     "followingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Follwers" ADD COLUMN     "followerId" INTEGER NOT NULL;
