import asyncHandler from "../../../handlers/asyncHandler.js";
import userModel from "../../../models/users.model.js";

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = res.body;
    await userModel.create({
        name,
        email,
        password
    })

    res.status(200).json({
        status: 'success',
        message: 'account added'
    })
});
export default register;