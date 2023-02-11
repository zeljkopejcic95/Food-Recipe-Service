const connection = require("../models/database");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const getAllUsers = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      connection.query(
        `SELECT first_name, last_name, email FROM users`,
        function(error, result) {
          if (error) {
            console.log(error);
          } else {
            res.send(result);
          }
        });
    }
   });
}

const deleteAllUsers = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      connection.query(
        `DELETE FROM users`,
        function(error, result) {
          if (error) {
            console.log(error);
          } else {
            res.send("Successfully deleted all users");
          }
        });
    }
   });
}

const getOneUserById = function(req, res) {
  const usersId = req.params.usersId;

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `SELECT first_name, last_name, email FROM users WHERE users_id = "${usersId}";`,
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          res.send(result);
        }
      });
  }
 });
}

const deleteOneUserById = function(req, res) {
  const usersId = req.params.usersId;

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `DELETE FROM users WHERE users_id = "${usersId}";`,
      function(error, result) {
        if (!error) {
          res.send("Successfully deleted user");
        }
      });
  }
 });
}

module.exports = {
  getAllUsers,
  deleteAllUsers,
  getOneUserById,
  deleteOneUserById
}
