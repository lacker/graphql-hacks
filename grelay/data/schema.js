import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  makeId,
  getTypeName,
} from './ids';

import {
  getUser,
  getComment,
  allUsers,
} from './database';


// This is hacky and only works for specifically the way getUser and
// getComment operate.
const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Comment') {
      return getComment(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj.username) {
      return UserType;
    } else if (obj.content)  {
      return CommentType;
    } else {
      return null;
    }
  }
);


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      resolve: () => getUser(),
    },
    comment: {
      type: CommentType,
      resolve: () => getComment(),
    },
    allUsers: {
      type: new GraphQLList(UserType),
      resolve: () => allUsers(),
    }
  }),
});

const Schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = { Schema };
