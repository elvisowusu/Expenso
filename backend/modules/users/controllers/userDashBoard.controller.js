const { default: mongoose } = require("mongoose");
const asyncHandler = require("../../../handlers/asyncHandler");
const userModel = require("../../../models/users.model");

const userDashBoard = asyncHandler(async (req, res) => {


    // Fetching user's profile
    const getUser = await userModel.findOne({
        _id: req.user.id
    }).select("-password")

    //     }).select("name email balance")
    
    res.status(200).json({
        status: "success",
        message: getUser,
    })
})

module.exports = userDashBoard