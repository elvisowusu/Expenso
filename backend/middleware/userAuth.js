const asyncHandler = require("../handlers/asyncHandler");
const jwt = require("jsonwebtoken")

const userAuthHandler = asyncHandler(async (req, res, next) => {
    
    try {
        // get the token generated from login
        const accessToken = req.headers.authorization.replace("Bearer ", "")

        // verify the token 
        const jwt_payload = jwt.verify(accessToken, process.env.jwt_key);

        // now making the payload accessible by all other controllers 
        req.user = jwt_payload;
        
    } catch (error) {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized!"
        })
    }

    next()
})

module.exports = userAuthHandler;