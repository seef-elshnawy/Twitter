/*
  Warnings:

  - Added the required column `tweetId` to the `Responses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Responses" ADD COLUMN     "tweetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
