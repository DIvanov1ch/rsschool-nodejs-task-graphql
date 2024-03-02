import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from './user-type.js';
import { UUIDType } from './uuid.js';

export const SubscribersOnAuthorsType = new GraphQLObjectType({
  name: 'SubscribersOnAuthors',
  fields: () => ({
    subscriber: { type: new GraphQLNonNull(UserType) },
    subscriberId: { type: new GraphQLNonNull(UUIDType) },
    author: { type: new GraphQLNonNull(UserType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});
