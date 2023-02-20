const connection = require("../models/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginQuery = function(req, res) {

  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    `SELECT * FROM users WHERE email = "${email}";`,
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result) {
          if (result[0].password === bcrypt.compare(password, result[0].password, function(error, data){
            if (error) {
              console.log(error);
            } else {
              console.log("Successfully logged");
              console.log(result);
            }
          }));
        }
      }

      const token = jwt.sign({userId: result[0].users_id}, process.env.PRIVATE_KEY, {expiresIn: "1h"});
      res.send({token: token});
    });
}

module.exports = {
  loginQuery
}
