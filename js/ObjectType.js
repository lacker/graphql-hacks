// Does a similar multiplexing to PrimitiveType.
// But, this does it for an "object" type.

import {
  GraphQLObjectType,
} from 'graphql';

import PrimitiveType from './PrimitiveType';

export default class ObjectType {
  // inputFields maps field name to simple format
  constructor(name, inputFields) {
    let fields = {};
    for (let field in inputFields) {
      let typeName = inputFields[field];
      fields[field] = { type: new PrimitiveType(typeName).graphql };
    }
    this.graphql = new GraphQLObjectType({name, fields});
    this.name = name;
  }
}
