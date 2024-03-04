import { GraphQLList } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { Profile } from '../models/profile.model.js';

export const profilesQuery = {
  type: new GraphQLList(Profile),
  resolve: async (_s, _a, context: ContextValueType) => {
    return await context.prisma.profile.findMany();
  },
};
