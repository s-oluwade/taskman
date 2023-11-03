import {startServerAndCreateNextHandler} from '@as-integrations/next';
import {ApolloServer} from '@apollo/server';
import {gql} from 'graphql-tag';
import {NextRequest} from 'next/server';
import {typeDefs} from './schema';
import {resolvers} from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
