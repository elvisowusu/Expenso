const asyncHandler = require("../../../handlers/asyncHandler");

const dashBoard = asyncHandler(async (req, res) => {


    res.status(200).json({
        status: "success",
        message: "User Authentication Successfull"
    })
})

module.exports = dashBoard