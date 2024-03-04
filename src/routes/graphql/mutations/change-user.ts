import { GraphQLNonNull } from 'graphql';
import { User } from '../models/user.model.js';
import { ContextValueType } from '../types/context-value-type.js';
import { UUIDType } from '../types/uuid.js';
import { ChangeUserInputType } from '../types/change-user-input-type.js';
import { UserInput } from '../types/input-types.js';

export const changeUser = {
  type: User,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeUserInputType) },
  },
  resolve: async (_, args: { id: string; dto: UserInput }, context: ContextValueType) => {
    const { id, dto } = args;
    return await context.prisma.user.update({
      where: { id },
      data: dto,
    });
  },
};
