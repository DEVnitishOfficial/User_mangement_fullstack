const express = require("express");
const instaRouter = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  logout,
  getUser
} = require("../controller/instaController");
instaRouter.post("/signup", signup);
instaRouter.post("/signin", signin);
instaRouter.post("/forgotPassword", forgotPassword);
instaRouter.post("/resetPassword", resetPassword);

instaRouter.get("/user", jwtAuth, getUser);
instaRouter.get("/logout", jwtAuth, logout);

module.exports = instaRouter
