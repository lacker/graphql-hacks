var { buildSchema } = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');
var mongo = require('./mongo');

var schema = buildSchema(`
  type Todo {
    id: String
    text: String
    completed: Boolean
  }

  type User {
    username: String
    todos: [Todo]
    authToken: String
  }

  type Query {
    me: User
    login(username: String, password: String): User
  }

  type Mutation {
    signup(username: String, password: String): User
    addTodo(text: String): Todo
  }
`);

var app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

mongo.connect().then(() => {
  app.listen(4000);
})
