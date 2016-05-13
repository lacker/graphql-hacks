import crypto from 'crypto';
import fs from 'fs';

import {
  graphql,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import express from 'express';
import graphqlHTTP from 'express-graphql';
import Sequelize from 'sequelize';
import { parse } from 'graphql/language';

import ObjectType from './ObjectType';
import PrimitiveType from './PrimitiveType';

const databaseFile = __dirname + '/../dev.db';
const databaseAlreadyExists = fs.existsSync(databaseFile);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(databaseFile);

// The intended schema.
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


const body = fs.readFileSync(__dirname + '/../schema.gql', 'utf8');
const ast = parse(body);
console.log('AST:', ast);

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

function randomID() {
  return crypto.randomBytes(12).toString('base64');
}

// Returns a promise for an integer.
// TODO: probably some race conditions here
// TODO: test this
function runCount() {
  return CounterTable.findAll().then((results) => {
    if (results.length == 0) {
      CounterTable.create({
        count: 1,
        id: randomID(),
      });
      return Promise.resolve(1);
    }
    const result = results[0];
    const newCount = result.count + 1;
    return CounterTable.update(
      {count: newCount},
      {where: {}}).then(() => {
      return newCount;
    })
  });
}

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

      findGameScores: {
        type: new GraphQLList(GameScore.graphql),
        resolve() {
          return []; // TODO: improve
        }
      },

      count: {
        type: GraphQLInt,
        resolve: runCount
      },

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
  return CounterTable.sync();
}).then(() => {
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
