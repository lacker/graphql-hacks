let express = require('express');
let postgraphql = require('postgraphql').default;
let Sequelize = require('sequelize');

// Set up the database
let username = 'devuser';
let password = 'devpass';
let dbname = 'devdb';
let url = `postgres://${username}:${password}@localhost:5432/${dbname}`;

let db = new Sequelize(url);

let Monster = db.define('monster', {
  name: Sequelize.STRING,
  charisma: Sequelize.INTEGER,
  likesBacon: Sequelize.BOOLEAN,
});

const app = express();

app.use(postgraphql(url));

let port = 4000;
app.listen(port, () => {
  console.log(`listening at localhost:${port}`);
});
