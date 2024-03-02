import { GraphQLInputObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { MemberTypeIdType } from './member-type-id.js';

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    memberTypeId: { type: MemberTypeIdType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});
