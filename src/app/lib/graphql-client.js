import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://headless.local/graphql';

export const client = new GraphQLClient(endpoint);
