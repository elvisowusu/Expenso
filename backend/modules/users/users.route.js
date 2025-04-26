const express = require("express");
const register = require("./controllers/register.controller");
const login = require("./controllers/login.controller");
const dashBoard = require("./controllers/dashBoard.controller");

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/dashboard", dashBoard);

module.exports = userRouter;