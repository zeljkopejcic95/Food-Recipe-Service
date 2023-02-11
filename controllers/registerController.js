const connection = require("../models/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const registerPage = function(req, res) {
  res.send("register page");
}

const register = function(req, res) {
  const userEmail = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, function(err, hash) {

    connection.query(
      `INSERT INTO users (email, first_name, last_name, password)
       VALUES ("${userEmail}", "${firstName}", "${lastName}", "${hash}");`,
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log("Successfully registered");
          res.send(result);
        }
      });
  });
}

module.exports = {
  registerPage,
  register
}
