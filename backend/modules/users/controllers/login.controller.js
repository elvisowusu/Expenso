const asyncHandler = require("../../../handlers/asyncHandler");
const jwtManager = require("../../../managers/jwtManager");
const userModel = require("../../../models/users.model");
const argon2 = require("argon2")

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check inputs 
    if (!email || !password) res.status(400).json({
        status: "failed",
        message:"Email and password are required"
    })

    // find the user
    const getUser = await userModel.findOne({
        email:email
    }).select("+password")

      // If user doesn't exist
    if (!getUser) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid email."
        });
    }

    // verify password 
    const isPasswordValid = await argon2.verify(getUser.password, password)
      if (!isPasswordValid) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid password."
        });
    }

    // generating access token 
    const accessToken = jwtManager(getUser)

    res.status(200).json({
        status: 'success',
        message: 'login successful',
        accessToken: accessToken
    })
})

module.exports = login