import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    content: { type: GraphQLString },
    title: { type: GraphQLString },
  }),
});
