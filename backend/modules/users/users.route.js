const express = require("express");
const register = require("./controllers/register.controller");
const login = require("./controllers/login.controller");
const userDashBoard = require("./controllers/userDashBoard.controller");
const userAuthHandler = require("../../middleware/userAuth");

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.use(userAuthHandler);
userRouter.get("/userDashboard", userDashBoard);

module.exports = userRouter;