import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import express from 'express';
import graphqlHTTP from 'express-graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

const app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(3000, function () {
  console.log('server running at http://localhost:3000');
});
