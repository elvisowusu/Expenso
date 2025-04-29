const express = require("express");
const expenses = require("./controllers/expenses.controller");
const income = require("./controllers/income.controller");
const userAuthHandler = require("../../middleware/userAuth");


const transactionRoutes = express.Router();
// Public routes

// middleware
transactionRoutes.use(userAuthHandler);

// Protected Routes
transactionRoutes.post("/expenses", expenses)
transactionRoutes.post("/income", income)

module.exports = transactionRoutes