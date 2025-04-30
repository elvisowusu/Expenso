const express = require("express");
const register = require("./controllers/register.controller");
const login = require("./controllers/login.controller");
const userDashBoard = require("./controllers/userDashBoard.controller");
const userAuthHandler = require("../../middleware/userAuth");
const forgotPassword = require("./controllers/forgotPassword.controller");
const resetPassword = require("./controllers/resetPassword.controller");

const userRoutes = express.Router();
// Public routes
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotPassword", forgotPassword)
userRoutes.post("/resetPassword",resetPassword)

//middleware
userRoutes.use(userAuthHandler);
//Protected routes
userRoutes.get("/userDashboard", userDashBoard);

module.exports = userRoutes;