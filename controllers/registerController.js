const registerService = require("../services/registerService");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const registerPage = function(req, res) {
  res.send("register page");
}

const register = function(req, res) {

  bcrypt.hash(password, saltRounds, function(err, hash) {

  registerService.registerQuery(req, res)  
  });
}

module.exports = {
  registerPage,
  register
}
