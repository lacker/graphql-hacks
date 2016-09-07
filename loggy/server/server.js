var express = require('express');
var graphqlHTTP = require('express-graphql');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var { buildSchema } = require('graphql');

// The secret used for JSON web tokens.
// In a real app, pick a better secret, like a long meaningless string.
var SECRET = 'secret';

// A map from username to password.
// In a real app, encrypt this and store it in a database.
var PASSWORDS = {};

var schema = buildSchema(`
  type User {
    username: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(username: String, password: String): String
    signup(username: String, password: String): String
  }
`);

var root = {
  login: function({username, password}) {
    if (!password || password !== PASSWORDS[username]) {
      throw new Error('invalid login');
    }
    return jwt.sign({username: username}, SECRET);
  },
  signup: function({username, password}) {
    if (!password || PASSWORDS[username]) {
      throw new Error('invalid signup');
    }
    return jwt.sign({username: username}, SECRET);
  },
  me: function({}, request) {
    if (!request.user || !request.user.username) {
      throw new Error('invalid auth');
    }
    return {username: request.user.username};
  },
};

var app = express();
app.use(auth.middleware);
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
