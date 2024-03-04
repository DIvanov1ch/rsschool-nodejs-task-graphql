import { GraphQLList, GraphQLResolveInfo } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { MemberType } from '../models/member-type.model.js';

export const memberTypesQuery = {
  type: new GraphQLList(MemberType),
  resolve: async (_s, _a, context: ContextValueType, _i: GraphQLResolveInfo) => {
    return await context.prisma.memberType.findMany();
  },
};
