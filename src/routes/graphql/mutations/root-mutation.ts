import { GraphQLObjectType } from 'graphql';
import { createUser } from './create-user.js';
import { createPost } from './create-post.js';
import { createProfile } from './create-profile.js';
import { deleteUser } from './delete-user.js';
import { deleteProfile } from './delete-profile.js';
import { deletePost } from './delete-post.js';
import { changePost } from './change-post.js';
import { changeUser } from './change-user.js';
import { changeProfile } from './change-profile.js';

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
    createPost,
    createProfile,

    deleteUser,
    deletePost,
    deleteProfile,

    changeUser,
    changePost,
    changeProfile,
  },
});
