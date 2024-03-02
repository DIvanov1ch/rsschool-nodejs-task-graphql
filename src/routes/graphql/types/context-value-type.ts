import { PrismaClient } from '@prisma/client';

export type ContextValueType = {
  prisma: PrismaClient;
};
