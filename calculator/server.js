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

  plus({value}) {
    return new Num(this.value + value);
  }

  minus({value}) {
    return new Num(this.value - value);
  }

  times({value}) {
    return new Num(this.value * value);
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

// Returns a function that can be used as a resolver.
// To use this, the object should have a method on it named after
// the field that accepts (args, context).
// It can just be the return value instead of a method, too.
// The signature for the returned resolver is:
// resolver(object, args, context)
function makeResolver(fieldName) {
  return (object, args, context) => {
    let prop = object[fieldName];
    if (prop instanceof Function) {
      return prop.bind(object)(args, context);
    }
    return prop;
  }
}

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
      resolve: makeResolver('value'),
    },
    plus: {
      type: NumType,
      args: {
        value: {
          type: GraphQLInt,
        }
      },
      resolve: makeResolver('plus'),
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
