const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema(
     {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required:[true,"user does not exist"]
        },
        amount: {
            type: Number,
            required: [true,"amount required"]
        },
        transaction_type: {
            type: String,
            require: true,
            enum:["income","expense"]
        },
        remarks: {
            type: String,
            required:[true,"remarks required"]
        }
    }, {
        timestamps: true
    }
)

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel