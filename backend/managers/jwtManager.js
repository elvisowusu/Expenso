
const jwt = require("jsonwebtoken")
const jwtManager =  (user) => {
    const accessToken = jwt.sign({
        id: user._id,
        name: user.name,
        balance:user.balance
    }, process.env.jwt_key)
    return accessToken;
}

module.exports = jwtManager;