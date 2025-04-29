const asyncHandler = require("../../../handlers/asyncHandler");

const expenses = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        status: "success",
        message:"expenses active"
    })
})

module.exports = expenses