import { GraphQLList } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { Post } from '../models/post.model.js';

export const postsQuery = {
  type: new GraphQLList(Post),
  resolve: async (_s, _a, context: ContextValueType) => {
    return await context.prisma.post.findMany();
  },
};
