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
    playerName: 'String',
    score: 'Int',
  }
};

// Schema loading logic

const sequelize = new Sequelize('dev', 'devuser', 'devpassword', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: databaseFile,
});

// TODO: migrate the database so that it matches the schema

const GameScoreType = new ObjectType('GameScore', schema.GameScore);

console.log(GameScoreType.graphql);

// Create a graphql schema from the schema
const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      highScore: {
        type: GameScoreType.graphql,
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
