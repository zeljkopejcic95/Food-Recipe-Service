const connection = require("../models/database");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const getAllRecipe_texts = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      connection.query(
        `SELECT recipe_text FROM food_recipe`,
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
  getAllRecipe_texts
}
