import { GraphQLList } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { ProfileType } from '../types/profile-type.js';

export const profilesQuery = {
  type: new GraphQLList(ProfileType),
  resolve: async (_s, _a, context: ContextValueType) => {
    return await context.prisma.profile.findMany();
  },
};
