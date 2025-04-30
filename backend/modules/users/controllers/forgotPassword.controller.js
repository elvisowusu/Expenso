const asyncHandler = require("../../../handlers/asyncHandler");
const userModel = require("../../../models/users.model");
const nodemailer = require("nodemailer")

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

      // Looking to send emails in production? Check out our Email API/SMTP product!
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ea9f630d55a164",
          pass: process.env.nodeMailer_key,
        },
      });
    
      transport.sendMail({
        to: email,
        from: "info@expenso.com",
          text: "Password reset code is " + resetCode,
        subject:"Password Rest"
      })
    
    res.status(201).json({
        status: "success",
        message: "email send for password reset "
      });
})

module.exports= forgotPassword