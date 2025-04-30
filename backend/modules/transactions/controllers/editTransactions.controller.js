const asyncHandler = require("../../../handlers/asyncHandler");
const transactionModel = require("../../../models/transactions.model");
const userModel = require("../../../models/users.model");

const editTransaction = asyncHandler(async (req, res) => {
    const { transactionId, transactionType, amount, remarks } = req.body;

    const transaction = await transactionModel.findOne({ _id: transactionId });

    // Check if transaction exists
    if (!transaction) {
        return res.status(404).json({
            status: "failed",
            message: "Transaction not found",
        });
    }

    // Reverse the previous balance effect
    const reverseAmount = transaction.transaction_type === "income" ? -transaction.amount : transaction.amount;
    await userModel.updateOne(
        { _id: req.user.id },
        { $inc: { balance: reverseAmount } }, {
            runValidators:true
        }
    );

    // Update the transaction
    transaction.amount = amount;
    transaction.transaction_type = transactionType;
    transaction.remarks = remarks;
    await transaction.save();

    // Apply new transaction balance effect
    const newAmount = transactionType === "income" ? amount : -amount;
    await userModel.updateOne(
        { _id: req.user.id },
        { $inc: { balance: newAmount } },
        { runValidators: true }
    );

    res.status(200).json({
        status: "success",
        message: "Transaction edited successfully",
        transaction
    });
});

module.exports = editTransaction;
