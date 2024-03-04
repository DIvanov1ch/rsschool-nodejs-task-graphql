import { ContextValueType } from '../types/context-value-type.js';
import { Post } from '../models/post.model.js';
import { UUIDType } from '../types/uuid.js';
import { Loaders } from '../types/loaders-enum.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.loaders.get(Loaders.POST_BY_ID)?.load(args.id);
};

export const postQuery = {
  type: Post,
  args: { id: { type: UUIDType } },
  resolve,
};
