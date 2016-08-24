const mongodb = require('mongodb-prebuilt');

// Start mongo.
// In a real production environment you wouldn't want your application
// server to start your database process like this.
const MONGO_PORT = 1337;
mongodb.start_server({args: {port: MONGO_PORT}});
