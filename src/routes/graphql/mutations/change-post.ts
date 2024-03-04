import { GraphQLNonNull } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { Post } from '../models/post.model.js';
import { UUIDType } from '../types/uuid.js';
import { ChangePostInputType } from '../types/change-post-input-type.js';
import { PostInput } from '../types/input-types.js';

export const changePost = {
  type: Post,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangePostInputType) },
  },
  resolve: async (_, args: { id: string; dto: PostInput }, context: ContextValueType) => {
    const { id, dto } = args;
    return await context.prisma.post.update({
      where: { id },
      data: dto,
    });
  },
};
