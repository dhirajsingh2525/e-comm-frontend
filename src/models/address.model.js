const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pincode: {
       type: Number,
       required: true
    },
    state: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true     
    }
})

module.exports = mongoose.model("address", addressSchema);