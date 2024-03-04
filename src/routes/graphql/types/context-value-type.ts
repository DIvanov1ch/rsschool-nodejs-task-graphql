import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export type ContextValueType = {
  prisma: PrismaClient;
  loaders: Map<string, DataLoader<unknown, unknown, unknown>>;
};
