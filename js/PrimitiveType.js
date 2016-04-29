// Each type has to be represented in several ways. This is kind of
// annoying. For something you might think of as "one type", like
// int or string, we might need to know:
//
// The type according to SQL
// The type according to Sequelize
// The type according to javascript
// The type according to GraphQL
// The type according to our own serialization format
//
// The goal of a PrimitiveType object is to let us pass around a single
// object that knows how to represent itself to any of these other
// systems. It doesn't handle types like objects that are composed of
// others; it just handles

import {
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Sequelize from 'sequelize';

const sequelizeMap = {
  Int: Sequelize.INTEGER,
  String: Sequelize.STRING,
};

const graphqlMap = {
  Int: GraphQLInt,
  String: GraphQLString,
}

export default class PrimitiveType {
  // Input name is in the "simple format" - "Int" for integer, etc.
  constructor(name) {
    this.name = name;
    this.sequelize = sequelizeMap[name];
    this.graphql = graphqlMap[name];
  }
}
