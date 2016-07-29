import express from 'express';
import graphqlHTTP from 'express-graphql';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
} from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      one: {
        type: GraphQLInt,
        resolve() {
          return 1;
        }
      },
      five: {
        type: GraphQLInt,
        resolve() {
          return 5;
        }
      }
    }
  })
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

const port = 4000;
console.log('listening on port', port);
app.listen(port);
