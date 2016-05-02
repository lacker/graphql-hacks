// Does a similar multiplexing to PrimitiveType.
// But, this does it for an "object" type.

import {
  GraphQLObjectType,
} from 'graphql';

import typeFromString from './typeFromString';

export default class ObjectType {
  // fields maps field name to simple format.
  constructor(name, fields) {
    this.name = name;

    // Construct alternative formats
    let graphqlFields = {};
    let sequelizeFields = {};
    for (let field in fields) {
      let type = typeFromString(fields[field]);
      graphqlFields[field] = {
        type: type.graphql,
      };
      sequelizeFields[field] = {
        type: type.sequelize,
      };
      if (field === 'id') {
        sequelizeFields.id.primaryKey = true;
      }
    }
    this.graphql = new GraphQLObjectType({name, fields: graphqlFields});
    this.sequelize = sequelizeFields;
  }
}
