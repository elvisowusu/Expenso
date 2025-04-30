const asyncHandler = require("../../../handlers/asyncHandler");
const emailManager = require("../../../managers/emailManager");
const userModel = require("../../../models/users.model");

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if(!email)  res.status(400).json({
        status: "failed",
        message: "email is required"
    });
    
    const getUser = await userModel.findOne({
        email:email
    })
    if(!getUser)  res.status(400).json({
        status: "failed",
        message: "user not found proceed to sign up "
    });
    
    const resetCode = Math.floor(1000 + Math.random() * 90000)
    
    await userModel.updateOne({
        email:email
    }, {
        reset_code: resetCode
    }, {
        runValidators:true
    })

    await emailManager(
        email,
        "Password Reset",
        "Reset your password",
        "Password reset code is "+ resetCode
    )
    
    res.status(201).json({
        status: "success",
        message: "email send for password reset "
      });
})

module.exports= forgotPassword