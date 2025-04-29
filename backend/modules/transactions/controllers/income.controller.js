const asyncHandler = require("../../../handlers/asyncHandler");
const validator = require("validator");
const transactionModel = require("../../../models/transactions.model");
const userModel = require("../../../models/users.model");


const income = asyncHandler(async (req, res) => {
    const { amount, remarks } = req.body;
    
    if (!amount || !remarks) res.status(400).json({
        status: "failed",
        message:"amount and remarks are required"
    })
    if(remarks.length< 5)res.status(400).json({
        status: "failed",
        message:"remarks should exceed 5 characters" 
    })
    if(!validator.isNumeric(amount.toString())) res.status(400).json({
        status: "failed",
        message:"amount must be a number"
    })

    const newIncome = await transactionModel.create({
        user_id: req.user.id,
        amount: amount,
        remarks: remarks,
        transaction_type: "income",
    })
    await userModel.updateOne({
        _id: req.user.id,
    }, {
        $inc: {
           balance:amount
       }
    }, {
        runValidators:true
    })
    res.status(200).json({
        status: "success",
        message: "income added",
    })
})

module.exports = income;