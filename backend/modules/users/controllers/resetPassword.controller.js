const asyncHandler = require("../../../handlers/asyncHandler");
const userModel = require("../../../models/users.model");

const resetPassword = asyncHandler(async (req, res) => {
    const { email, resetCode, newPassword } = req.body;
    if (!email || resetCode || newPassword) res.status(400).json({
        status: 'failed',
        message: "all fields are required"
    });
    const getUser = await userModel.updateOne({
        email: email,
    }, {
        password:newPassword
    }, {
        runValidators:true
    })
})
module.exports = resetPassword