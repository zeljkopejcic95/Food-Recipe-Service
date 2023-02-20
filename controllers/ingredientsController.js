require("dotenv").config()
const jwt = require("jsonwebtoken");
const ingredientsService = require("../services/ingredientsService");

const getAllIngredients = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      ingredientsService.allIngredientsQuery(req, res);
    }
   });
}


module.exports = {
  getAllIngredients
}
