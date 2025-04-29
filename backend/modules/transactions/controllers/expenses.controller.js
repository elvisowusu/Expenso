const asyncHandler = require("../../../handlers/asyncHandler");
const transactionModel = require("../../../models/transactions.model");

const expenses = asyncHandler(async (req, res) => {
  
    
    res.status(200).json({
        status: "success",
        message: "expenses active",
        expenses:addExpenses
    })
})

module.exports = expenses