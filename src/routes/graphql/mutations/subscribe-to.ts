import { GraphQLNonNull } from 'graphql';
import { UserType } from '../types/user-type.js';
import { UUIDType } from '../types/uuid.js';
import { ContextValueType } from '../types/context-value-type.js';

export const subscribeTo = {
  type: UserType,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (
    _,
    args: { userId: string; authorId: string },
    context: ContextValueType,
  ) => {
    const { userId, authorId } = args;
    return await context.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userSubscribedTo: {
          create: {
            authorId,
          },
        },
      },
    });
  },
};
