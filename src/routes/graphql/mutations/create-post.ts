import { GraphQLNonNull } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { CreatePostInputType } from '../types/create-post-input-type.js';
import { PostType } from '../types/post-type.js';
import { PostInput } from '../types/input-types.js';

export const createPost = {
  type: PostType,
  args: { dto: { type: new GraphQLNonNull(CreatePostInputType) } },
  resolve: async (_, args: { dto: PostInput }, context: ContextValueType) => {
    return await context.prisma.post.create({
      data: args.dto,
    });
  },
};
