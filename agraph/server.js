import express from 'express';
import { apolloServer } from 'graphql-tools';

import connectors from './data/connectors';
import mocks from './data/mocks';
import schema from './data/schema';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

graphQLServer.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  connectors,
  mocks,
  schema,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
