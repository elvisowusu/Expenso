const asyncHandler = require("../../../handlers/asyncHandler");
const userModel = require("../../../models/users.model");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    await userModel.find()

    res.status(200).json({
        status: 'success',
        message:'login successful'
    })
})

module.exports = login