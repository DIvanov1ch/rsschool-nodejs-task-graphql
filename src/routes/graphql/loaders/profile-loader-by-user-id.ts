import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

export const createProfileLoaderByUserId = (prisma: PrismaClient) => {
  const batchProfilesByUserId = async (
    keys: readonly unknown[],
  ): Promise<Array<Profile | null>> => {
    const ids = keys as string[];
    const profiles = await prisma.profile.findMany({
      where: {
        userId: { in: ids },
      },
    });

    return ids.map(
      (userId) => profiles.find((profile) => profile.userId === userId) || null,
    );
  };

  return new DataLoader(batchProfilesByUserId);
};
