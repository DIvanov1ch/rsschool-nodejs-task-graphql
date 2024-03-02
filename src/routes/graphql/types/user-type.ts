import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile-type.js';
import { PostType } from './post-type.js';
import { ContextValueType } from './context-value-type.js';

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

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: { type: ProfileType, resolve: resolveProfile },
    posts: { type: new GraphQLList(PostType), resolve: resolvePosts },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: resolveSubscriptions,
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: resolveSubscribers,
    },
  }),
});
