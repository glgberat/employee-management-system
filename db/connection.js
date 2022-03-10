const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      port: 3306,
      user: 'root',
      // Your MySQL password
      password: 'root',
      database: 'employeetrack'
    },
    console.log('Connected to the employeetrack database.')
  );


  module.exports = db;