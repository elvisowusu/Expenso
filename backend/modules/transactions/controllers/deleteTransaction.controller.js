const asyncHandler = require("../../../handlers/asyncHandler");
const transactionModel = require("../../../models/transactions.model");
const validator = require("validator")

const deleteTransaction = asyncHandler(async (req, res) => {
    const {
        transactionId
    } = req.params;

    // Check if transactionId is provided
    if (!transactionId || !validator.isMongoId(transactionId)) {
        return res.status(400).json({
            status: "failed",
            message: "Provide a valid transaction ID",
        });
    }

    const transaction = await transactionModel.findOneAndDelete({
        _id: transactionId
    });

    if (!transaction) {
        return res.status(404).json({
            status: "failed",
            message: "Transaction not found",
        });
    }
    res.status(200).json({
        status: "success",
        message: "Transaction deleted successfully",
        transaction
    })
})
module.exports = deleteTransaction