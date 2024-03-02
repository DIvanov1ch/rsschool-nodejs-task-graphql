import { GraphQLNonNull } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { ProfileType } from '../types/profile-type.js';
import { CreateProfileInputType } from '../types/create-profile-input-type.js';
import { ProfileInput } from '../types/input-types.js';

export const createProfile = {
  type: ProfileType,
  args: { dto: { type: new GraphQLNonNull(CreateProfileInputType) } },
  resolve: async (_, args: { dto: ProfileInput }, context: ContextValueType) => {
    return await context.prisma.profile.create({
      data: args.dto,
    });
  },
};
