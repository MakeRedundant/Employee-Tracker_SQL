const mysql = require("mysql2");
require("dotenv").config(); // This package is used to load environment variables from a .env file.

const db = mysql.createConnection({
  host: 'localhost',  // Assuming your database is on localhost
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
  if (err) {
      console.error('Error connecting to the database: ' + err.code + ' - ' + err.message);
      return;
  }
  console.log('Connected to the employee_db.');
});

module.exports = db;