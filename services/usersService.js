const connection = require("../models/database");

const allUsersQuery = function(req, res) {
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

const deleteAllUsersQuery = function (req, res) {
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

const oneUserByIdQuery = function (req, res) {
  const usersId = req.params.usersId;

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

const deleteOneUserByIdQuery = function(req, res) {
  const usersId = req.params.usersId;

  connection.query(
    `DELETE FROM users WHERE users_id = "${usersId}";`,
    function(error, result) {
      if (!error) {
        res.send("Successfully deleted user");
      }
    });
}

module.exports = {
  allUsersQuery,
  deleteAllUsersQuery,
  oneUserByIdQuery,
  deleteOneUserByIdQuery
}
