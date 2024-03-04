import { ContextValueType } from '../types/context-value-type.js';
import { Profile } from '../models/profile.model.js';
import { UUIDType } from '../types/uuid.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.prisma.profile.findUnique({ where: { id: args.id } });
};

export const profileQuery = {
  type: Profile,
  args: { id: { type: UUIDType } },
  resolve,
};
