var auth = require('./auth');
var mongo = require('./mongo');

class User {
  constructor(username) {
    this.username = username;
  }
}

// Creates a new user.
// Returns a promise for an auth token.
// Fails if this username is already taken.
function signup({username, password}) {
  // TODO: create hashedPassword
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
function login({username, password}) {
  return mongo.db.user.findOne({
    username
  }).then((data) => {
    // TODO: check the password
  });
}

module.exports = { User, signup };
