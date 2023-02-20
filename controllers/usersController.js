require("dotenv").config()
const jwt = require("jsonwebtoken");
const usersService = require("../services/usersService");

const getAllUsers = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      usersService.allUsersQuery(req, res);
    }
   });
}

const deleteAllUsers = function(req, res) {
  jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      usersService.deleteAllUsersQuery(req, res);
    }
   });
}

const getOneUserById = function(req, res) {

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    usersService.oneUserByIdQuery(req, res);
  }
 });
}

const deleteOneUserById = function(req, res) {

jwt.verify(req.token, process.env.PRIVATE_KEY, function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    usersService.deleteOneUserByIdQuery(req, res);
  }
 });
}

module.exports = {
  getAllUsers,
  deleteAllUsers,
  getOneUserById,
  deleteOneUserById
}
