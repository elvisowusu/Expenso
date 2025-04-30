const asyncHandler = require("../../../handlers/asyncHandler");
const emailManager = require("../../../managers/emailManager");
const userModel = require("../../../models/users.model");
const argon2 = require("argon2");

const resetPassword = asyncHandler(async (req, res) => {
    const { email, resetCode, newPassword } = req.body;

    if (!email || !resetCode || !newPassword) {
        return res.status(400).json({
            status: 'failed',
            message: "All fields are required"
        });
    }
    const hashedPassword = await argon2.hash(newPassword);
    await userModel.updateOne(
        { email },
        { password: hashedPassword, reset_code: null },
        { runValidators: true }
    );

    await emailManager(
        email,
        "Password Reset",
        "Password has been reset successfully",
        "Password has been reset successfully"
    );

    res.status(200).json({
        status: "success",
        message: "New password added to profile"
    });
});

module.exports = resetPassword;
