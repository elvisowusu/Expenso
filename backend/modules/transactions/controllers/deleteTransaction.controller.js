const asyncHandler = require("../../../handlers/asyncHandler");
const transactionModel = require("../../../models/transactions.model");
const validator = require("validator");
const userModel = require("../../../models/users.model");

const deleteTransaction = asyncHandler(async (req, res) => {
    const { transactionId } = req.params;

    // Validate transaction ID
    if (!transactionId || !validator.isMongoId(transactionId)) {
        return res.status(400).json({
            status: "failed",
            message: "Provide a valid transaction ID",
        });
    }

    // Find the transaction
    const transaction = await transactionModel.findOne({ _id: transactionId });

    // Check if it exists
    if (!transaction) {
        return res.status(404).json({
            status: "failed",
            message: "Transaction not found",
        });
    }

    // Adjust user balance if it's income
    if (transaction.transaction_type === "income") {
        await userModel.updateOne(
            { _id: req.user.id },
            {
                $inc: {
                    balance: transaction.amount * -1,
                },
            }
        );
    }

    // Delete the transaction
    await transactionModel.deleteOne({ _id: transactionId });

    // Send success response
    res.status(200).json({
        status: "success",
        message: "Transaction deleted successfully",
    });
});

module.exports = deleteTransaction;
