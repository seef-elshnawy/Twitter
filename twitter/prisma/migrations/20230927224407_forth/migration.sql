/*
  Warnings:

  - You are about to drop the column `followingId` on the `Followings` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `Follwers` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `Followings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Follwers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Followings" DROP COLUMN "followingId",
ADD COLUMN     "followerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Follwers" DROP COLUMN "followerId",
ADD COLUMN     "followingId" INTEGER NOT NULL;
