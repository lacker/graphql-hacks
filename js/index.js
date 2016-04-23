import fs from 'fs';

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import express from 'express';
import graphqlHTTP from 'express-graphql';

const databaseFile = __dirname + '/../dev.db';
const databaseAlreadyExists = fs.existsSync(databaseFile);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(databaseFile);

// The intended schema
const schema = {
  GameScore: {
    playerName: 'String',
    score: 'Int',
  }
};

function graphQLTypeFromTypeString(typeString) {
  switch (typeString) {
    case 'String':
      return GraphQLString;

    case 'Int':
      return GraphQLInt;

    default:
      throw 'unknown typestring: ' + typeString;
  }
}

function defaultForTypeString(typeString) {
  switch (typeString) {
    case 'String':
      return 'hello';

    case 'Int':
      return 42;

    default:
      throw 'unknown typestring: ' + typeString;
  }
}

// Construct the graphql schema from the specified schema
let rootFields = {};
for (let typeName in schema) {
  let objectArg = {
    name: typeName,
    fields: {},
  };
  for (let fieldName in schema[typeName]) {
    let typeString = schema[typeName][fieldName];
    objectArg.fields[fieldName] = {
      type: graphQLTypeFromTypeString(typeString),
    }
  }
  rootFields[typeName] = new GraphQLObjectType(objectArg);
}
// TODO: actually use that code above


const GameScoreType = new GraphQLObjectType({
  name: 'GameScoreType',
  fields: {
    playerName: {
      type: GraphQLString,
    },
    score: {
      type: GraphQLInt,
    },
  }
});

// Create a graphql schema from the schema
const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      highScore: {
        type: GameScoreType,
        resolve() {
          return {
            playerName: 'Kevin',
            score: 1337,
          }
        }
      }
    }
  })
});

const app = express();

app.use('/graphql', graphqlHTTP({ schema: gqlSchema, graphiql: true }));

app.listen(3000, function () {
  console.log('server running at http://localhost:3000');
});
