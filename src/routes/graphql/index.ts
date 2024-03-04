import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, validate, parse } from 'graphql';
import { rootQuery } from './queries/root-query.js';
import { rootMutation } from './mutations/root-mutation.js';
import depthLimit from 'graphql-depth-limit';
import { createLoaders } from './loaders/loaders.js';

const DEPTH_LIMIT = 5;

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const errors = validate(schema, parse(query), [depthLimit(DEPTH_LIMIT)]);
      if (errors.length) {
        return { errors };
      }

      const loaders = createLoaders(prisma);

      return await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, loaders },
      });
    },
  });
};

export default plugin;
