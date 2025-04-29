const express = require("express");
const expenses = require("./controllers/expenses.controller");
const income = require("./controllers/income.controller");


const transactionRouter = express.Router();

transactionRouter.get("/expenses", expenses)
transactionRouter.get("/income", income)