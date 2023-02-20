const connection = require("../models/database");

const registerQuery = function (req, res) {
  const userEmail = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

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
}

module.exports = {
  registerQuery
}
