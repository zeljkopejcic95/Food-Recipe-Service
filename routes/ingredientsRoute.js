const express = require("express");
const ingredientsController = require("../controllers/ingredientsController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, ingredientsController.getAllIngredients);

module.exports = router;
