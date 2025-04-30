const express = require("express");
const expenses = require("./controllers/expenses.controller");
const income = require("./controllers/income.controller");
const userAuthHandler = require("../../middleware/userAuth");
const getTransactions = require("./controllers/getTransactions.controller");
const deleteTransaction = require("./controllers/deleteTransaction.controller");


const transactionRoutes = express.Router();
// Public routes

// middleware
transactionRoutes.use(userAuthHandler);

// Protected Routes
transactionRoutes.post("/expenses", expenses)
transactionRoutes.post("/income", income)
transactionRoutes.get("/", getTransactions)
transactionRoutes.delete("/:transactionId",deleteTransaction)

module.exports = transactionRoutes