import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberType } from './member-type.model.js';
import { MemberTypeIdType } from '../types/member-type-id.js';
import { User } from './user.model.js';
import { ContextValueType } from '../types/context-value-type.js';

const resolve = async (
  source: { memberTypeId: string },
  _,
  context: ContextValueType,
) => {
  return await context.prisma.memberType.findUnique({
    where: {
      id: source.memberTypeId,
    },
  });
};

export const Profile: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },

    user: { type: User },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: { type: new GraphQLNonNull(MemberType), resolve },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdType) },
  }),
});
