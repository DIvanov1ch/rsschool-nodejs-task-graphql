import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ContextValueType } from '../types/context-value-type.js';

export const deleteProfile = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: async (_, args: { id: string }, context: ContextValueType) => {
    await context.prisma.profile.delete({
      where: {
        id: args.id,
      },
    });
  },
};
