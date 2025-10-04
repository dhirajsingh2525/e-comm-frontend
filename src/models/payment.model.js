const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
       type: String,
       required: true
    },
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        required: true
    },
    order_id: {
        type: String
    },
    payment_id: {
        type: String

    },
    signature: {
        type: String
    }
})

module.exports = mongoose.model("payment", paymentSchema)

    // order_id payment_id, signature----> order create karte waqt aapke paas ye values nahi hoti, isliye required: true nahi rakha.