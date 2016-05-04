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
import Sequelize from 'sequelize';

import ObjectType from './ObjectType';
import PrimitiveType from './PrimitiveType';

const databaseFile = __dirname + '/../dev.db';
const databaseAlreadyExists = fs.existsSync(databaseFile);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(databaseFile);

// The intended schema. This should look like the json format that
// the schema would get stored as on-disk.
// Everything gets a non-null string id, as well.
const schema = {
  GameScore: {
    id: 'String!',
    playerName: 'String',
    score: 'Int',
  },
  Counter: {
    id: 'String!',
    count: 'Int',
  },
};

// Load types from the schema
const GameScore = new ObjectType('GameScore', schema.GameScore);
const Counter = new ObjectType('Counter', schema.Counter);

// Create the database schema
const sequelize = new Sequelize('dev', 'devuser', 'devpassword', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: databaseFile,
});

const GameScoreTable = sequelize.define(
  'GameScore',
  GameScore.sequelize,
  { freezeTableName: true });

const CounterTable = sequelize.define(
  'Counter',
  Counter.sequelize,
  { freezeTableName: true });

console.log('TODO: getCounter, fill out');

// Create a graphql schema
const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      highScore: {
        type: GameScore.graphql,
        resolve() {
          return {
            playerName: 'Kevin',
            score: 1337,
          }
        }
      },

      getCounter: {
        // TODO: ?
      }

      hello: {
        type: GraphQLInt,
        resolve() {
          return 3;
        }
      }
    }
  })
});

// Migrate the database if need be, before starting the server
GameScoreTable.sync().then(() => {

  // Add some sample data
  const table = GameScoreTable.build({
    playerName: 'Kevin',
    score: Math.floor(Math.random() * 1000 + 10000),
  });
  return table.save();
}).then(() => {
  const app = express();

  app.use('/graphql', graphqlHTTP({ schema: gqlSchema, graphiql: true }));

  app.listen(3000, function () {
    console.log('server running at http://localhost:3000');
  });
});
