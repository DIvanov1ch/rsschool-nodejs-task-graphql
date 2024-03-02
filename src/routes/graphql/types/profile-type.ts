import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLNonNull } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeType } from './member-type-type.js';
import { MemberTypeIdType } from './member-type-id.js';
import { UserType } from './user-type.js';
import { ContextValueType } from './context-value-type.js';

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

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },

    user: { type: UserType },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: { type: new GraphQLNonNull(MemberTypeType), resolve },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdType) },
  }),
});
