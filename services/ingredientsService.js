const connection = require("../models/database");


const allIngredientsQuery = function(req, res) {
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

module.exports = {
  allIngredientsQuery
}
