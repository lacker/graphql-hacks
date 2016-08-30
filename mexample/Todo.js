var uuid = require('node-uuid');

var mongo = require('./mongo');

class Todo {
  constructor({id, text, completed, username}) {
    this.id = id || uuid.v4();
    this.text = text || '';
    this.completed = completed || false;
    this.username = username || (
      throw new Error('todo items must have a username'));
  }

  // Returns a promise for a list of todos with the given username
  findByUsername(username) {
    // TODO: implement
  }
}

module.exports = Todo;
