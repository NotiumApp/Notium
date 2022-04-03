-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userUid" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
