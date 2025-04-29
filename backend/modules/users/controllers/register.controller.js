const asyncHandler = require("../../../handlers/asyncHandler");
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

  res.status(201).json({
    status: "success",
    message: "Account added",
    accessToken
  });
});

module.exports = register;
