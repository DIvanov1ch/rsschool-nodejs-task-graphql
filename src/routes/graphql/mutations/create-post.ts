import { GraphQLNonNull } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { CreatePostInputType } from '../types/create-post-input-type.js';
import { Post } from '../models/post.model.js';
import { PostInput } from '../types/input-types.js';

export const createPost = {
  type: Post,
  args: { dto: { type: new GraphQLNonNull(CreatePostInputType) } },
  resolve: async (_, args: { dto: PostInput }, context: ContextValueType) => {
    return await context.prisma.post.create({
      data: args.dto,
    });
  },
};
