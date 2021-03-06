import assert from 'assert';
import fs from 'fs';

import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
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

  // Returns the GraphQL type based on a name.
  // This works both for things like "Int" that can be handled by default,
  // and for any custom types that are only defined in this schema.
  getType(typeName) {
    switch(typeName) {
      case 'Int':
      return GraphQLInt;
      case 'String':
      return GraphQLString;
      default:
      // We have to read it from the schema.
    }

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
      // constructor. The keys of fieldMap are the names of fields, and
      // their values are objects with `type`, `resolve`, and maybe `args`.
      // This happens in the thunk so that we can grab type names
      // recursively and use memoization.
      let fieldMap = {};
      for (let field of definition.fields) {
        let fieldName = field.name.value;

        // TODO: see if we can avoid makeResolver
        let resolve = makeResolver(fieldName);

        let args = {};
        for (let arg of field.arguments) {
          let argName = arg.name.value;
          let argTypeName = arg.type.name.value;
          let argType = this.getType(argTypeName);
          console.log(argName, '->', argTypeName, argType);
          args[argName] = { type: argType };
        }
        let typeName = field.type.name.value;
        let type = this.getType(typeName);
        fieldMap[fieldName] = {
          resolve,
          type,
          args,
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
let NumType = typeSet.getType('Num');

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

export default schema;
