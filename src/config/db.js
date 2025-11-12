require('dotenv').config();
const mysql = require('mysql2/promise');
const url = require('url');

const dbUrl = new URL(process.env.DATABASE_URL);
const pool = mysql.createPool({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),
  port: dbUrl.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully.');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });


module.exports = {pool};
