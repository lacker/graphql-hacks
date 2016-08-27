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
  }

  type Query {
    me: User
  }

  type Mutation {
    login(username: String, password: String): String
    signup(username: String, password: String): String
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
  console.log('Running server on port 4000');
})
