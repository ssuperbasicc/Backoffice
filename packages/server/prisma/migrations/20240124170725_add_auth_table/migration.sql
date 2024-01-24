-- CreateTable
CREATE TABLE "AuthHistory" (
    "id" BIGSERIAL NOT NULL,
    "jti" VARCHAR(64) NOT NULL,
    "uid" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthHistory" ADD CONSTRAINT "AuthHistory_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
