var prebuilt = require('mongodb-prebuilt');
var { MongoClient } = require('mongodb');

// Set up the database.
// In a real production environment you wouldn't want your application
// server to start your database process like this.
prebuilt.start_server(null, (errorCode) => {
  console.log('start_server got error code', errorCode);
});

// Connect to the 'todofullstack' database on the default Mongo port.
// Returns a promise that resolves once we have connected to the database.
// After that promise resolves, the database is usable and exported.
function connect() {
  var url = 'mongodb://localhost:27017/todofullstack';
  return MongoClient.connect(url).then((db) => {
    console.log('connected ok');
    module.exports.db = db;
  });
}

module.exports = { connect };
