import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.GRAPHQL_ENDPOINT;

export const client = new GraphQLClient(endpoint);