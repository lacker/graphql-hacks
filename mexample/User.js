var auth = require('./auth');
var mongo = require('./mongo');

class User {
  constructor(username) {
    this.username = username;
  }
}

// Returns a promise for the User.
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

module.exports = { User, signup };
