const mysql = require("mysql2");
require("dotenv").config(); // This package is used to load environment variables from a .env file.

const DB = mysql.createConnection(
//Creates a connection to the mySQL db 
//.createConnection method by the mysql12  to create a single MySQL connection to the db
 //host, user, password and database properties are set using environment variables (to hide senstive info)
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_db database.`)
);

// const pool = mysql.createPool(
// //creates a connection pool that allows you to manage multiple dbs 
//   {
//     host: "localhost",
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true, 
//     connectionLimit: 10,
//     queueLimit: 0,
//   },
//   console.log(`Connected pool to the employee_db database.`)
// );

// const promisePool = pool.promise(); //Creates a promise-based version of the connection pool

// // Export the connection objects
// module.exports = { DB: DB, pool: pool, promisePool: promisePool };

module.exports = DB;