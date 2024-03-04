import { GraphQLObjectType } from 'graphql';
import { profilesQuery } from './profiles-query.js';
import { postsQuery } from './posts-query.js';
import { memberTypesQuery } from './member-types-query.js';
import { profileQuery } from './profile-query.js';
import { postQuery } from './post-query.js';
import { memberTypeQuery } from './member-type-query.js';
import { usersQuery } from './users-query.js';
import { userQuery } from './user-query.js';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: usersQuery,
    profiles: profilesQuery,
    posts: postsQuery,
    memberTypes: memberTypesQuery,

    user: userQuery,
    profile: profileQuery,
    post: postQuery,
    memberType: memberTypeQuery,
  }),
});
