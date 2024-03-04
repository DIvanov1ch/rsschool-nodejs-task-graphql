import { ContextValueType } from '../types/context-value-type.js';
import { User } from '../models/user.model.js';
import { UUIDType } from '../types/uuid.js';
import { Loaders } from '../types/loaders-enum.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.loaders.get(Loaders.USER)?.load(args.id);
};

export const userQuery = {
  type: User,
  args: { id: { type: UUIDType } },
  resolve,
};
