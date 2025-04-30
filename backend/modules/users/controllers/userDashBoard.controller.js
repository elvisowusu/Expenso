const { default: mongoose } = require("mongoose");
const asyncHandler = require("../../../handlers/asyncHandler");
const userModel = require("../../../models/users.model");
const transactionModel = require("../../../models/transactions.model");

const userDashBoard = asyncHandler(async (req, res) => {


    // Fetching user's profile
    const getUser = await userModel.findOne({
        _id: req.user.id
    }).select("-password")  // }).select("name email balance")
    
    const transactions = await transactionModel.find({
        user_id:req.user.id
    }).sort("-createdAt").limit(5)
    res.status(200).json({
        status: "success",
        message: getUser,
        transactions
    })
})

module.exports = userDashBoard