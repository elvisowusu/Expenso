const asyncHandler = require("../../../handlers/asyncHandler");
const transactionModel = require("../../../models/transactions.model");

const getTransactions = asyncHandler(async (req, res) => {
    
   const transactions = await transactionModel.find({})

    res.status(200).json({
        status: "success",
        transactions:transactions
    })
})

module.exports = getTransactions