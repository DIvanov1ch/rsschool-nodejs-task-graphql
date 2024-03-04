import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { User } from './user.model.js';
import { UUIDType } from '../types/uuid.js';

export const SubscribersOnAuthors = new GraphQLObjectType({
  name: 'SubscribersOnAuthors',
  fields: () => ({
    subscriber: { type: new GraphQLNonNull(User) },
    subscriberId: { type: new GraphQLNonNull(UUIDType) },
    author: { type: new GraphQLNonNull(User) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});
