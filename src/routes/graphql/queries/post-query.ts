import { ContextValueType } from '../types/context-value-type.js';
import { PostType } from '../types/post-type.js';
import { UUIDType } from '../types/uuid.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.prisma.post.findUnique({ where: { id: args.id } });
};

export const postQuery = {
  type: PostType,
  args: { id: { type: UUIDType } },
  resolve,
};
