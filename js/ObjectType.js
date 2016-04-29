// Does a similar multiplexing to PrimitiveType.
// But, this does it for an "object" type.

import {
  GraphQLObjectType,
} from 'graphql';

import PrimitiveType from './PrimitiveType';

export default class ObjectType {
  // fields maps field name to simple format.
  constructor(name, fields) {
    this.name = name;

    // Construct alternative formats
    let graphqlFields = {};
    let sequelizeFields = {};
    for (let field in fields) {
      let type = new PrimitiveType(fields[field]);
      graphqlFields[field] = {
        type: type.graphql,
      };
      sequelizeFields[field] = {
        type: type.sequelize,
      };
    }
    this.graphql = new GraphQLObjectType({name, fields: graphqlFields});
    this.sequelize = sequelizeFields;
  }
}
