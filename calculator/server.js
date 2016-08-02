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

// TODO: make this read from a .graphql file type
let NumType = new GraphQLObjectType({
  name: 'Num',
  fields: () => ({
    value: {
      type: GraphQLInt,
    },
    plus: {
      type: NumType,
    },
    minus: {
      type: NumType,
    },
    times: {
      type: NumType,
    },
  }),
});

// TODO: make this schema read from .graphql file
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      get: {
        type: NumType,
        resolve(_, {value}) {
          return new Num(value);
        }
      },
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
