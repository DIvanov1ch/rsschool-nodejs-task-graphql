import { ContextValueType } from '../types/context-value-type.js';
import { UserType } from '../types/user-type.js';
import { UUIDType } from '../types/uuid.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.prisma.user.findUnique({ where: { id: args.id } });
};

export const userQuery = {
  type: UserType,
  args: { id: { type: UUIDType } },
  resolve,
};
