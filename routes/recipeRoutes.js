const express = require("express");
const recipeController = require("../controllers/recipeController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// list all recipes
// router.get("/", verifyToken, recipeController.listAllRecipes);

// list all recepies from specific user
router.get("/", verifyToken, recipeController.listAllRecipesCurrentUser);

// create new recipe with user ID
router.post("/", verifyToken, recipeController.createNewRecipe);

router.delete("/", verifyToken, recipeController.deleteAllRecipes);

router.get("/:recipeId", verifyToken, recipeController.getOneRecipeById);

router.put("/:recipeId", verifyToken, recipeController.updateOneRecipeById);

router.delete("/:recipeId", verifyToken, recipeController.deleteOneRecipeById);

module.exports = router;
