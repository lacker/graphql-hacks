var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var SECRET = 'its-a-secret-to-everybody';

// This middleware sets request.user to the payload of a json web token
var middleware = expressJWT({
  secret: SECRET,
  credentialsRequired: false,
});

// Creates a json web token with a given payload
function createToken(payload) {
  return jwt.sign(payload, SECRET);
}

module.exports = { middleware, createToken };
