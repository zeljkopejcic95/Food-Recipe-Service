const connection = require("../models/database");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const getAllIngredients = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      connection.query(
        `SELECT ingredients FROM food_recipe`,
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

module.exports = {
  getAllIngredients
}
