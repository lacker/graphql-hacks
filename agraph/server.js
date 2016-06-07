import express from 'express';
import { apolloServer } from 'graphql-tools';

import connectors from './data/connectors';
import mocks from './data/mocks';
import resolvers from './data/resolvers';
import schema from './data/schema';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

// NOTE: mocks are currently unused
graphQLServer.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  connectors,
  resolvers,
  schema,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
