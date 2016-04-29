// Wraps a primitive type and enforces non-null.

import {
  GraphQLNonNull
} from 'graphql';

import PrimitiveType from './PrimitiveType';

export default class NonNullType {
  // name is a primitive type string name like 'Int' or 'String'
  constructor(name) {
    this.subType = new PrimitiveType(name);
    this.name = name + '!';
    this.sequelize = {
      type: this.subtype.sequelize,
      allowNull: false,
    }
    this.graphql = new GraphQLNonNull(this.subtype.graphql);
  }
