-- CreateTable
CREATE TABLE "Follwers" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Follwers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Followings" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,

    CONSTRAINT "Followings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follwers" ADD CONSTRAINT "Follwers_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followings" ADD CONSTRAINT "Followings_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
