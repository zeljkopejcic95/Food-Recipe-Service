const connection = require("../models/database");

// const allRecipesQuery = function(req, res) {
//   connection.query(
//          `SELECT * FROM food_recipe`,
//          function(error, result) {
//            if (error) {
//              console.log(error);
//            } else {
//              res.send(result);
//            }
//          });
// }

const allRecipesCurrentUserQuery = function(req, res) {
  connection.query(`SELECT * FROM food_recipe WHERE users_id = "${data.userId}"`, function (error, result){
                      if (error) {
                        console.log(error);
                      } else {
                        res.send(result);
                      }
                    });
}

const newRecipeQuery = function (req, res) {
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

const deleteAllRecipesQuery = function(req, res) {
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

const oneRecipeByIdQuery = function(req, res) {
  const recipeId = req.params.recipeId;

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

const updateOneRecipeByIdQuery = function(req, res) {
  const foodName = req.body.name;
  const foodIngredients = req.body.ingredients;
  const recipeText = req.body.recipeText;

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

const deleteOneRecipeByIdQuery = function(req, res) {
  const recipeId = req.params.recipeId;

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

module.exports = {
  // allRecipesQuery
  allRecipesCurrentUserQuery,
  newRecipeQuery,
  deleteAllRecipesQuery,
  oneRecipeByIdQuery,
  updateOneRecipeByIdQuery,
  deleteOneRecipeByIdQuery
}
