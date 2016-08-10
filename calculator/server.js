import assert from 'assert';
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
let typeDoc = parse(body);
assert.equal(typeDoc.kind, 'Document');
let types = typeDoc.definitions;

console.log(types);

// This function plus schema.graphql should be all you need
function get(value) {
  return new Num(value);
}

// TODO: make this read from a .graphql file type
let NumType = new GraphQLObjectType({
  name: 'Num',
  fields: () => ({
    value: {
      type: GraphQLInt,
    },
    plus: {
      type: NumType,
        args: {
          value: {
            type: GraphQLInt,
          }
        },
    },
    minus: {
      type: NumType,
        args: {
          value: {
            type: GraphQLInt,
          }
        },
    },
    times: {
      type: NumType,
        args: {
          value: {
            type: GraphQLInt,
          }
        },      
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
        args: {
          value: {
            type: GraphQLInt,
          }
        },
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
