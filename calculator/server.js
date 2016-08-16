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

class Query {
  get({value}) {
    return new Num(value);
  }
};

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

// Reads a bunch of types from a file
class TypeSet {
  constructor(filename) {
    let body = fs.readFileSync(filename, 'utf8');
    let typeDoc = parse(body);
    assert.equal(typeDoc.kind, 'Document');
    this.definitions = typeDoc.definitions;

    // Cache of type name to type object
    this.objectTypeCache = {};
  }

  // TODO: why is this not the same as makeObjectType
  typeFromTypeName(typeName) {
    switch (typeName) {
      case 'Int':
      return GraphQLInt;

      default:
      throw new Error('typeFromTypeName does not handle ' + typeName);
    }
  }

  // Creates a GraphQLObjectType for a non-special type as defined
  // in the definitions list parsed from a graphql file.
  makeObjectType(typeName) {
    if (this.objectTypeCache[typeName]) {
      return this.objectTypeCache[typeName];
    }

    // Find the right definition
    let definition;
    for (let d of this.definitions) {
      if (d.kind == 'ObjectTypeDefinition' &&
          d.name.value == typeName) {
        definition = d;
      }
    }
    if (!definition) {
      throw new Error('no definition found for type with name: ' + typeName);
    }

    let fields = () => {
      // Construct the fields argument to be used in the GraphQLObjectType
      // constructor. The keys of fieldMap are the names of fields, and their
      // values are objects with `type`, `resolve`, and maybe `args`.
      // This happens in the thunk so that we can grab type names
      // recursively and use memoization.
      let fieldMap = {};
      for (let field of definition.fields) {
        let fieldName = field.name.value;
        let resolve = makeResolver(fieldName);

        // TODO: extract type and args in addition to resolve
        console.log(fieldName, 'field is:', field);
        let typeName = field.type.name.value;
        fieldMap[fieldName] = {
          resolve
        };
      }
      return fieldMap;
    };

    this.objectTypeCache[typeName] = new GraphQLObjectType({
      name: typeName,
      fields,
    });
    return this.objectTypeCache[typeName];
  }
}

let typeSet = new TypeSet(require.resolve('./schema.graphql'));
let NumType = typeSet.makeObjectType('Num');

// TODO: remove after I make this use the above makeObjectType line instead
let NumTypeOld = new GraphQLObjectType({
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
      resolve: makeResolver('minus'),
    },
    times: {
      type: NumType,
      args: {
        value: {
          type: GraphQLInt,
        }
      },
      resolve: makeResolver('times'),
    },
  }),
});

// TODO: make this schema be constructed with makeResolver and 'query'
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
        resolve(root, {value}) {
          console.log('root is:', root);
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
