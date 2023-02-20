const connection = require("../models/database");

const allRecipe_textsQuery = function(req, res) {
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

module.exports = {
  allRecipe_textsQuery
}
