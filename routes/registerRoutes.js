const express = require("express");
const registerController = require("../controllers/registerController");

const router = express.Router();

router.get("/", registerController.registerPage);

router.post("/", registerController.register);

module.exports = router;
