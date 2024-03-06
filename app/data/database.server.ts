import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
  console.log('Connected to production database');
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
    console.log('Connected to dev database ++');
  }
  prisma = global.__db;
  console.log('Connected to dev database');
}

export { prisma };

