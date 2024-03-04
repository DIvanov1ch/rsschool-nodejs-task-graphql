import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

export const createProfileLoaderById = (prisma: PrismaClient) => {
  const batchProfilesById = async (
    keys: readonly unknown[],
  ): Promise<Array<Profile | null>> => {
    const ids = keys as string[];
    const profiles = await prisma.profile.findMany({
      where: {
        id: { in: ids },
      },
    });

    return ids.map((id) => profiles.find((profile) => profile.id === id) || null);
  };

  return new DataLoader(batchProfilesById);
};
