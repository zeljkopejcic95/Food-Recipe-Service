require("dotenv").config()
const jwt = require("jsonwebtoken");
const recipe_textService = require("../services/recipe_textService");


const getAllRecipe_texts = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      recipe_textService.allRecipe_textsQuery(req, res);
    }
   });
}

module.exports = {
  getAllRecipe_texts
}
