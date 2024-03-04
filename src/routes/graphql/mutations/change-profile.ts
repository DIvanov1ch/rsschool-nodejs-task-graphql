import { GraphQLNonNull } from 'graphql';
import { ContextValueType } from '../types/context-value-type.js';
import { Profile } from '../models/profile.model.js';
import { UUIDType } from '../types/uuid.js';
import { ChangeProfileInputType } from '../types/change-profile-input-type.js';
import { ProfileInput } from '../types/input-types.js';

export const changeProfile = {
  type: Profile,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
  },
  resolve: async (
    _,
    args: { id: string; dto: ProfileInput },
    context: ContextValueType,
  ) => {
    const { id, dto } = args;
    return await context.prisma.profile.update({
      where: { id },
      data: dto,
    });
  },
};
