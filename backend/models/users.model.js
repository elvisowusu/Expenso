const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: [true, "Email already exist"],
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
      default: 0,
    },
    reset_code: {
      type:Number
    }
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
