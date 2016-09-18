// An integration test.
var User = require('./User');

var username = 'bob';
var password = 'monkey';
User.signup({username, password}).then((authToken1) => {
  return User.login({username, password});
}).then((authToken2) => {
  console.log('ok');
}).catch((error) => {
  console.log('error:', error);
})

// TODO: run this. convert to jest
