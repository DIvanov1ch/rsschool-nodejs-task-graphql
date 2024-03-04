import { GraphQLList } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { User } from '../models/user.model.js';

export const usersQuery = {
  type: new GraphQLList(User),
  resolve: async (_s, _a, context: ContextValueType) => {
    return await context.prisma.user.findMany();
  },
};
