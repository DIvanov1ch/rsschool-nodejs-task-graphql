import { GraphQLList, GraphQLResolveInfo } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { MemberTypeType } from '../types/member-type-type.js';

export const memberTypesQuery = {
  type: new GraphQLList(MemberTypeType),
  resolve: async (_s, _a, context: ContextValueType, _i: GraphQLResolveInfo) => {
    return await context.prisma.memberType.findMany();
  },
};
