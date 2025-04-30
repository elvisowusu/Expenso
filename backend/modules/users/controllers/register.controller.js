const asyncHandler = require("../../../handlers/asyncHandler");
const jwtManager = require("../../../managers/jwtManager");
const userModel = require("../../../models/users.model");
const nodemailer = require("nodemailer")

const register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Passwords do not match",
    });
  }

  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  const accessToken = jwtManager(newUser);

  req.user = accessToken;

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
    to: newUser.email,
    from: "info@expenso.com",
    text: "Welcome to Expenso",
    subject:"Welcome"
  })

  res.status(201).json({
    status: "success",
    message: "Account added",
    accessToken,
  });
});

module.exports = register;
