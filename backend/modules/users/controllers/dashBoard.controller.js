const asyncHandler = require("../../../handlers/asyncHandler");

const dashBoard = asyncHandler(async (req, res) => {


    res.status(200).json({
        status: "success",
        message: "User Authentication Successfull",
        payLoad: req.user
    })
})

module.exports = dashBoard