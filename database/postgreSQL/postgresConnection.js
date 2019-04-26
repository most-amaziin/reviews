const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'Maggie',
  database: 'postgres',
  password: 'mypassword'
});

client.connect((err, success) => {
  if (err) {
    console.log('error connecting to db:', err);
  } else {
    console.log('success connecting to db!');
  }
});

module.exports = client;
