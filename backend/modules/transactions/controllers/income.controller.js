const asyncHandler = require("../../../handlers/asyncHandler");

const income = asyncHandler( async () => {
    res.status(200).json({
        status: "success",
        message:"income active"
    })
})

module.exports = income;