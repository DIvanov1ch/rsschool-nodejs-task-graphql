import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const createUserSubscribedToLoader = (prisma: PrismaClient) => {
  const batchUserSubscribedTo = async (keys: readonly unknown[]) => {
    const ids = keys as string[];
    const users = await prisma.user.findMany({
      where: {
        subscribedToUser: {
          some: {
            subscriberId: { in: ids },
          },
        },
      },
      include: { subscribedToUser: true },
    });

    const usersMap = new Map<string, User[]>();
    users.forEach((user) => {
      const { subscribedToUser } = user;
      subscribedToUser.forEach((subs) => {
        if (usersMap.has(subs.subscriberId)) {
          usersMap.get(subs.subscriberId)?.push(user);
          return;
        }
        usersMap.set(subs.subscriberId, [user]);
      });
    });

    return ids.map((id) => usersMap.get(id) || []);
  };

  return new DataLoader(batchUserSubscribedTo);
};
