import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ContextValueType } from '../types/context-value-type.js';

export const unsubscribeFrom = {
  type: GraphQLBoolean,
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
    await context.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId,
        },
      },
    });
  },
};
