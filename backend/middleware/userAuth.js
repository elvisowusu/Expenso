const asyncHandler = require("../handlers/asyncHandler");
const jwt = require("jsonwebtoken")

const userAuthHandler = asyncHandler(async (req, res, next) => {
    // get the token generated from login
    const accessToken = req.headers.authorization.replace("Bearer ","")
    console.log(accessToken)

    // verify the token 
    try {
        const jwt_payload= jwt.verify(accessToken, process.env.jwt_key);
    console.log(jwt_payload)
    } catch (error) {
        res.status(401).json({
            status: "failed",
            message:"Unauthorized!"
        })
    }

    next()
})

module.exports = userAuthHandler;