import { ContextValueType } from '../types/context-value-type.js';
import { User } from '../models/user.model.js';
import { UUIDType } from '../types/uuid.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.prisma.user.findUnique({ where: { id: args.id } });
};

export const userQuery = {
  type: User,
  args: { id: { type: UUIDType } },
  resolve,
};
