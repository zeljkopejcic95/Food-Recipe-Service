const express = require("express");
const recipe_textController = require("../controllers/recipe_textController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, recipe_textController.getAllRecipe_texts);

module.exports = router;
