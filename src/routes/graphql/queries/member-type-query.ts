import { ContextValueType } from '../types/context-value-type.js';
import { MemberType } from '../models/member-type.model.js';
import { MemberTypeIdType } from '../types/member-type-id.js';
import { Loaders } from '../types/loaders-enum.js';

const resolve = async (_, args: { id: string }, context: ContextValueType) => {
  return await context.loaders.get(Loaders.MEMBER_TYPE)?.load(args.id);
};

export const memberTypeQuery = {
  type: MemberType,
  args: { id: { type: MemberTypeIdType } },
  resolve,
};
