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

const resolveProfile = async (source: { id: string }, _, context: ContextValueType) => {
  return await context.prisma.profile.findUnique({
    where: {
      userId: source.id,
    },
  });
};

const resolvePosts = async (source: { id: string }, _, context: ContextValueType) => {
  return await context.prisma.post.findMany({
    where: {
      authorId: source.id,
    },
  });
};

const resolveSubscriptions = async (
  source: { id: string },
  _,
  context: ContextValueType,
) => {
  return await context.prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: source.id,
        },
      },
    },
  });
};

const resolveSubscribers = async (
  source: { id: string },
  _,
  context: ContextValueType,
) => {
  return await context.prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: source.id,
        },
      },
    },
  });
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
