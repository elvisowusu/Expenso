const mongoose = require("mongoose");
const argon2 = require("argon2");

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
  },
  { timestamps: true }
);

userSchema.pre("validate", async function (next) {
  if (this.isModified("password")) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
