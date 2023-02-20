const loginService = require("../services/loginService");


const loginPage = function(req, res) {
  res.send("login page");
}

const login = function(req, res) {
  loginService.loginQuery(req, res);
}

module.exports = {
  loginPage,
  login
}
