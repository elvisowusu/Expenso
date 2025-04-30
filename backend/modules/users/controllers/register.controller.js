const asyncHandler = require("../../../handlers/asyncHandler");
const emailManager = require("../../../managers/emailManager");
const jwtManager = require("../../../managers/jwtManager");
const userModel = require("../../../models/users.model");

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
  await emailManager(
    newUser.email,
    "Welcome to Expenso",
    "Welcome to Expenso",
    "This is a platform to help make you a good financial steward"
  )

  res.status(201).json({
    status: "success",
    message: "Account added",
    accessToken,
  });
});

module.exports = register;
