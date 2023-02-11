const connection = require("../models/database");
const jwt = require("jsonwebtoken");
require("dotenv").config()


// const listAllRecipes = function(req, res) {
//   jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       connection.query(
//         `SELECT * FROM food_recipe`,
//         function(error, result) {
//           if (error) {
//             console.log(error);
//           } else {
//             res.send(result);
//           }
//         });
//     }
//   });
// }

const listAllRecipesCurrentUser = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(data);
      connection.query(`SELECT * FROM food_recipe WHERE users_id = "${data.userId}"`, function (error, result){
                          if (error) {
                            console.log(error);
                          } else {
                            res.send(result);
                          }
                        });
    }
  });
}

const createNewRecipe = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(data);
      connection.query(`INSERT INTO food_recipe (name, ingredients, recipe_text, users_id)
                        VALUES ("${req.body.name}", "${req.body.ingredients}", "${req.body.recipeText}", "${data.userId}");`,
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

const deleteAllRecipes = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
        connection.query(
          `DELETE FROM food_recipe`,
          function(error, result) {
            if (error) {
              console.log(error);
            } else {
              res.send(result);
              console.log("Successfully deleted all recipes");
            }
          });
    }
   });
}

const getOneRecipeById = function(req, res) {

const recipeId = req.params.recipeId;

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    connection.query(
      `SELECT * FROM food_recipe WHERE recipe_id = "${recipeId}";`,
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

const updateOneRecipeById = function(req, res) {
  const foodName = req.body.name;
  const foodIngredients = req.body.ingredients;
  const recipeText = req.body.recipeText;

  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      connection.query(
        `UPDATE food_recipe
         SET name = "${foodName}", ingredients = "${foodIngredients}", recipe_text = "${recipeText}", users_id = "${data.userId}"
         WHERE recipe_id = "${req.params.recipeId}";`,
         function (error, result) {
           if (error) {
             console.log(error);
           } else {
             console.log("Successfully updated.");
             res.send(result);
           }
         });
    }
  });
}

const deleteOneRecipeById = function(req, res) {
  const recipeId = req.params.recipeId;

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    console.log(data);
    connection.query(
      `DELETE FROM food_recipe WHERE recipe_id = "${recipeId}";`,
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log("Successfully deleted recipe");
          res.send(result)
        }
      });
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
