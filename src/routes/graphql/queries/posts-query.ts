import { GraphQLList } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { PostType } from '../types/post-type.js';

export const postsQuery = {
  type: new GraphQLList(PostType),
  resolve: async (_s, _a, context: ContextValueType) => {
    return await context.prisma.post.findMany();
  },
};
