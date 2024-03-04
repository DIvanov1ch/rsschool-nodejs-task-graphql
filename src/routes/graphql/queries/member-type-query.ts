import { ContextValueType } from '../types/context-value-type.js';
import { MemberType } from '../models/member-type.model.js';
import { MemberTypeIdType } from '../types/member-type-id.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.prisma.memberType.findUnique({ where: { id: args.id } });
};

export const memberTypeQuery = {
  type: MemberType,
  args: { id: { type: MemberTypeIdType } },
  resolve,
};
