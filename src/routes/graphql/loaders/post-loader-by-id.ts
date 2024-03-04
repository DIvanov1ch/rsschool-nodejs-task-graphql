import { PrismaClient, Post } from '@prisma/client';
import DataLoader from 'dataloader';

export const createPostLoaderById = (prisma: PrismaClient) => {
  const batchPostsById = async (
    keys: readonly unknown[],
  ): Promise<Array<Post | null>> => {
    const ids = keys as string[];
    const posts = await prisma.post.findMany({
      where: {
        id: { in: ids },
      },
    });

    return ids.map((id) => posts.find((post) => post.id === id) || null);
  };

  return new DataLoader(batchPostsById);
};
