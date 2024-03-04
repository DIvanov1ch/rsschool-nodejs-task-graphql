import { PrismaClient, Post } from '@prisma/client';
import DataLoader from 'dataloader';

export const createPostLoaderByAuthorId = (prisma: PrismaClient) => {
  const batchPostsByAuthorId = async (
    keys: readonly unknown[],
  ): Promise<Array<Post[] | []>> => {
    const ids = keys as string[];
    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: ids },
      },
    });

    const postsMap = new Map<string, Post[]>();
    posts.forEach((post) => {
      const { authorId } = post;
      if (postsMap.has(authorId)) {
        postsMap.get(authorId)?.push(post);
        return;
      }
      postsMap.set(authorId, [post]);
    });
    return ids.map((authorId) => postsMap.get(authorId) || []);
  };

  return new DataLoader(batchPostsByAuthorId);
};
