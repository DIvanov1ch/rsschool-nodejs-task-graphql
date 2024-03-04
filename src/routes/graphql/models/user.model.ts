import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Profile } from './profile.model.js';
import { Post } from './post.model.js';
import { ContextValueType } from '../types/context-value-type.js';
import { Loaders } from '../types/loaders-enum.js';

const resolveProfile = async (source: { id: string }, _, context: ContextValueType) => {
  return await context.loaders.get(Loaders.PROFILE_BY_USER_ID)?.load(source.id);
};

const resolvePosts = async (source: { id: string }, _, context: ContextValueType) => {
  return context.loaders.get(Loaders.POST_BY_AUTHOR_ID)?.load(source.id);
};

const resolveSubscriptions = async (
  source: { id: string },
  _,
  context: ContextValueType,
) => {
  return await context.loaders.get(Loaders.USER_SUBSCRIBED_TO)?.load(source.id);
};

const resolveSubscribers = async (
  source: { id: string },
  _,
  context: ContextValueType,
) => {
  return await context.loaders.get(Loaders.SUBSCRIBED_TO_USER)?.load(source.id);
};

export const User: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: { type: Profile, resolve: resolveProfile },
    posts: { type: new GraphQLList(Post), resolve: resolvePosts },
    userSubscribedTo: {
      type: new GraphQLList(User),
      resolve: resolveSubscriptions,
    },
    subscribedToUser: {
      type: new GraphQLList(User),
      resolve: resolveSubscribers,
    },
  }),
});
