import { GraphQLNonNull } from 'graphql';
import { CreateUserInputType } from '../types/create-user-input-type.js';
import { UserType } from '../types/user-type.js';
import { ContextValueType } from '../types/context-value-type.js';
import { UserInput } from '../types/input-types.js';

export const createUser = {
  type: UserType,
  args: { dto: { type: new GraphQLNonNull(CreateUserInputType) } },
  resolve: async (_, args: { dto: UserInput }, context: ContextValueType) => {
    return await context.prisma.user.create({
      data: args.dto,
    });
  },
};
