import mongoose from "mongoose";
import argon2 from "argon2";

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

userSchema.pre('save',async function (next) {
    if (this.isModified(this.password)) {
        this.password= await argon2.hash(this.password)
    }
    next();
})

const userModel = mongoose.model('User', userSchema);

export default userModel;