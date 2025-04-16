const userModel = require("../models/users.model");
const asyncHandler = require("../utils/asyncHandler");

const addUser = asyncHandler(async (req, res) => { 
    const { name, email, password } = req.body;

    const newUser = userModel.create({
        name, 
        email,
        password
    })

    
    // success message 
    res.status(200).json({
        status: 'success',
        message:'user created successfully'
    })
});

module.exports = addUser