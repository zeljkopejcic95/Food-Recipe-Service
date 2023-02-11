const express = require("express");
const usersController = require("../controllers/usersController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, usersController.getAllUsers);

router.delete("/", verifyToken, usersController.deleteAllUsers);

router.get("/:usersId", verifyToken, usersController.getOneUserById);

router.delete("/:usersId", verifyToken, usersController.deleteOneUserById);

module.exports = router;
