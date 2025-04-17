const asyncHandler = require("../../../handlers/asyncHandler");
const userModel = require("../../../models/users.model");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  await userModel.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    message: "Account added",
  });
});

module.exports = register;
