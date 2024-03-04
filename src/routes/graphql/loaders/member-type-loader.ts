import { PrismaClient, MemberType } from '@prisma/client';
import DataLoader from 'dataloader';

export const createMemberTypeLoader = (prisma: PrismaClient) => {
  const batchMemberTypes = async (
    keys: readonly unknown[],
  ): Promise<Array<MemberType | null>> => {
    const ids = keys as string[];
    const memberTypes = await prisma.memberType.findMany({
      where: {
        id: { in: ids },
      },
    });

    return ids.map(
      (id) => memberTypes.find((memberType) => memberType.id === id) || null,
    );
  };

  return new DataLoader(batchMemberTypes);
};
