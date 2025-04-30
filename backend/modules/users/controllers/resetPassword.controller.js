const asyncHandler = require("../../../handlers/asyncHandler");
const emailManager = require("../../../managers/emailManager");
const userModel = require("../../../models/users.model");

const resetPassword = asyncHandler(async (req, res) => {
    const { email, resetCode, newPassword } = req.body;
    if (!email || resetCode || newPassword) res.status(400).json({
        status: 'failed',
        message: "all fields are required"
    });
    const getUser= await userModel.updateOne({
        email: email,
    }, {
        password:newPassword
    }, {
        runValidators:true
    })

    await emailManager(
        getUser.email,
        "Password Reset",
        "Password Reset",
        "Password has been reset successfully "
    )
    res.status(200).json({
        status: "success",
        message:"new password added to profile"
    })
})
module.exports = resetPassword