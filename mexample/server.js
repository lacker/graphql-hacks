// TODO: use require so that it works in straight node
import buildSchema from 'graphql';
import graphqlHTTP from 'express-graphql';

const app = express();

// TODO: more features besides login + adding a todo
const schema = buildSchema(`
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

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3000);
