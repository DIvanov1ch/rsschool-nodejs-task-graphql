import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const createSubscribedToUserLoader = (prisma: PrismaClient) => {
  const batchSubscribedToUser = async (keys: readonly unknown[]) => {
    const ids = keys as string[];
    const users = await prisma.user.findMany({
      where: {
        userSubscribedTo: {
          some: {
            authorId: { in: ids },
          },
        },
      },
      include: { userSubscribedTo: true },
    });

    const usersMap = new Map<string, User[]>();
    users.forEach((user) => {
      const { userSubscribedTo } = user;
      userSubscribedTo.forEach((subs) => {
        if (usersMap.has(subs.authorId)) {
          usersMap.get(subs.authorId)?.push(user);
          return;
        }
        usersMap.set(subs.authorId, [user]);
      });
    });

    return ids.map((id) => usersMap.get(id) || []);
  };

  return new DataLoader(batchSubscribedToUser);
};
