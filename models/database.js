const mysql = require("mysql2");
require("dotenv").config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: "recipedb",
  password: process.env.DB_PASSWORD
});

module.exports = connection;
