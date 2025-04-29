const express = require("express");
const expenses = require("./controllers/expenses.controller");
const income = require("./controllers/income.controller");
const userAuthHandler = require("../../middleware/userAuth");
const getTransactions = require("./controllers/getTransactions.controller");


const transactionRoutes = express.Router();
// Public routes

// middleware
transactionRoutes.use(userAuthHandler);

// Protected Routes
transactionRoutes.post("/expenses", expenses)
transactionRoutes.post("/income", income)
transactionRoutes.get("/", getTransactions)

module.exports = transactionRoutes