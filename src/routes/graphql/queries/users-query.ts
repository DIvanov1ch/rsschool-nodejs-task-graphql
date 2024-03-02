import { GraphQLList } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { UserType } from '../types/user-type.js';

export const usersQuery = {
  type: new GraphQLList(UserType),
  resolve: async (_s, _a, context: ContextValueType) => {
    return await context.prisma.user.findMany();
  },
};
