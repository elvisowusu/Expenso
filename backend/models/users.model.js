import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"],
    },
    email: {
        type: String,
        required: [true,"Email required"],
        unique: [true,"Email already exist"],
    },
    password: {
        type: String,
        required: [true, "password required"],
    },
    balance: {
        type: Number,
        required: [true, "balance is required"],
        default: 0
    }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;