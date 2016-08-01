import express from 'express';
import graphqlHTTP from 'express-graphql';
import fs from 'fs';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  parse,
} from 'graphql';

class Num {
  constructor(value) {
    this.value = value;
  }

  plus(x) {
    return new Num(this.value + x);
  }

  minus(x) {
    return new Num(this.value - x);
  }

  times(x) {
    return new Num(this.value * x);
  }
}

// Read from schema.graphql
let body = fs.readFileSync(
  require.resolve('./schema.graphql'),
  'utf8');
console.log('body:', body);
let types = parse(body);
console.log('types:', types);

// TODO: make this schema read from .graphql file
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
  schema: schema,
  graphiql: true
}));

const port = 4000;
console.log('listening on port', port);
app.listen(port);
