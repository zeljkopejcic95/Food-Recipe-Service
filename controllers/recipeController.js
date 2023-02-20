require("dotenv").config()
const jwt = require("jsonwebtoken");
const recipeService = require("../services/recipeService");


// const listAllRecipes = function(req, res) {
//   jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//      recipeService.allRecipesQuery(req, res);
//     }
//   });
// }

const listAllRecipesCurrentUser = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(data);
      recipeService.allRecipesCurrentUserQuery(req, res);
    }
  });
}

const createNewRecipe = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(data);
      recipeService.newRecipeQuery(req, res);
    }
  });
}

const deleteAllRecipes = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
        recipeService.deleteAllRecipesQuery(req, res);
    }
   });
}

const getOneRecipeById = function(req, res) {

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    recipeService.oneRecipeByIdQuery(req, res);
  }
 });
}

const updateOneRecipeById = function(req, res) {

  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      recipeService.updateOneRecipeByIdQuery(req, res);
    }
  });
}

const deleteOneRecipeById = function(req, res) {

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    console.log(data);
    recipeService.deleteOneRecipeByIdQuery(req, res);
  }
 });
}

module.exports = {
  // listAllRecipes
  listAllRecipesCurrentUser,
  createNewRecipe,
  deleteAllRecipes,
  getOneRecipeById,
  updateOneRecipeById,
  deleteOneRecipeById
}
