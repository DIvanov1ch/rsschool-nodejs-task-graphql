import { ContextValueType } from '../types/context-value-type.js';
import { Profile } from '../models/profile.model.js';
import { UUIDType } from '../types/uuid.js';
import { Loaders } from '../types/loaders-enum.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.loaders.get(Loaders.PROFILE_BY_ID)?.load(args.id);
};

export const profileQuery = {
  type: Profile,
  args: { id: { type: UUIDType } },
  resolve,
};
