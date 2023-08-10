//Require modules 
const express = require("express");
const mysql = require("mysql2");
const db = require("./DB/connection.js");
const api = require("./index.js"); //recheck this

// Set the port for the server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware: Setting up Express middleware
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded data
app.use(express.json());                           // Parse JSON data
// app.use('/api', api);                           // Use the imported API routes (mounted under '/api')

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end(); //.end() is a express method that ends the response without sending any more data
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});