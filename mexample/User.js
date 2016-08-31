var bcrypt = require('bcrypt');

var auth = require('./auth');
var mongo = require('./mongo');
var Todo = require('./Todo');

class User {
  constructor(username) {
    this.username = username;
  }

  // Creates a new user.
  // Returns a promise for an auth token.
  // Fails if this username is already taken.
  static signup({username, password}) {
    var hashedPassword = bcrypt.hashSync(password, 10);
    return mongo.db.user.findAndModify({
      query: {username},
      update: {
        $setOnInsert: {
          username,
          hashedPassword,
        }
      },
      upsert: true
    }).then((data) => {
      if (data) {
        throw 'There is already a user with this username.';
      } else {
        return auth.createToken({username});
      }
    });
  }

  // Finds a new user with a given username and password.
  // Returns a promise for an auth token.
  // Fails if the login information is invalid.
  static login({username, password}) {
    return mongo.db.user.findOne({
      username
    }).then((data) => {
      if (bcrypt.compareSync(password, hashedPassword)) {
        // Login succeeded
        return auth.createToken({username});
      } else {
        // Wrong password
        throw new Error('Invalid username + password');
      }
    }).catch((err) => {
      // No such username
      throw new Error('Invalid username + password');
    });
  }

  todos() {
    return Todo.findByUsername(this.username);
  }

  me({}, request) {
    if (!request.user || !request.user.username) {
      throw new Error('there is no me');
    }
    return mongo.db.user.findOne({username}).then((data) => {
      return new User(username);
    });
  }
}


module.exports = User;
