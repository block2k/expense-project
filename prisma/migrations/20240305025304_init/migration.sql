-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "amount" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);
