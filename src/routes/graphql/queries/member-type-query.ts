import { ContextValueType } from '../types/context-value-type.js';
import { MemberTypeType } from '../types/member-type-type.js';
import { MemberTypeIdType } from '../types/member-type-id.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.prisma.memberType.findUnique({ where: { id: args.id } });
};

export const memberTypeQuery = {
  type: MemberTypeType,
  args: { id: { type: MemberTypeIdType } },
  resolve,
};
