import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const createUserLoader = (prisma: PrismaClient) => {
  const batchUsers = async (keys: readonly unknown[]): Promise<Array<User | null>> => {
    const ids = keys as string[];
    const users = await prisma.user.findMany({
      where: {
        id: { in: ids },
      },
    });

    return ids.map((id) => users.find((user) => user.id === id) || null);
  };

  return new DataLoader(batchUsers);
};
