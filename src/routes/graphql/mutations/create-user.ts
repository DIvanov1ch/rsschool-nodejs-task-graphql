import { GraphQLNonNull } from 'graphql';
import { CreateUserInputType } from '../types/create-user-input-type.js';
import { User } from '../models/user.model.js';
import { ContextValueType } from '../types/context-value-type.js';
import { UserInput } from '../types/input-types.js';

export const createUser = {
  type: User,
  args: { dto: { type: new GraphQLNonNull(CreateUserInputType) } },
  resolve: async (_, args: { dto: UserInput }, context: ContextValueType) => {
    return await context.prisma.user.create({
      data: args.dto,
    });
  },
};
