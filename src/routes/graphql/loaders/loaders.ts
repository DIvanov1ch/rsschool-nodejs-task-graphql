import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { Loaders } from '../types/loaders-enum.js';
import { createUserLoader } from './user-loader.js';
import { createPostLoaderByAuthorId } from './post-loader-by-author-id.js';
import { createProfileLoaderByUserId } from './profile-loader-by-user-id.js';
import { createMemberTypeLoader } from './member-type-loader.js';
import { createSubscribedToUserLoader } from './subscribed-to-user-loader.js';
import { createUserSubscribedToLoader } from './user-subscribed-to-loader.js';
import { createPostLoaderById } from './post-loader-by-id.js';
import { createProfileLoaderById } from './profile-loader-by-id.js';

export const createLoaders = (prisma: PrismaClient) => {
  const loaders = new Map<string, DataLoader<unknown, unknown, unknown>>();

  const userLoader = createUserLoader(prisma);

  const postLoaderById = createPostLoaderById(prisma);

  const postLoaderByAuthorId = createPostLoaderByAuthorId(prisma);

  const profileLoaderById = createProfileLoaderById(prisma);

  const profileLoaderByUserId = createProfileLoaderByUserId(prisma);

  const memberTypeLoader = createMemberTypeLoader(prisma);

  const subscribedToUserLoader = createSubscribedToUserLoader(prisma);

  const userSubscribedToLoader = createUserSubscribedToLoader(prisma);

  loaders.set(Loaders.USER, userLoader);
  loaders.set(Loaders.POST_BY_ID, postLoaderById);
  loaders.set(Loaders.POST_BY_AUTHOR_ID, postLoaderByAuthorId);
  loaders.set(Loaders.PROFILE_BY_ID, profileLoaderById);
  loaders.set(Loaders.PROFILE_BY_USER_ID, profileLoaderByUserId);
  loaders.set(Loaders.MEMBER_TYPE, memberTypeLoader);
  loaders.set(Loaders.SUBSCRIBED_TO_USER, subscribedToUserLoader);
  loaders.set(Loaders.USER_SUBSCRIBED_TO, userSubscribedToLoader);

  return loaders;
};
