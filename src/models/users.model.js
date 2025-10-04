const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
     username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
        }
    },
    password: String,
    cart: {
        type: [],
        ref: "product"
    },
    role: {
        type: String,
        enum: [ "user", "seller" ],
        default: "user",
    },
    mobile: {
        type: Number,
        required: true

    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    }


})

module.exports = mongoose.model("user", userSchema);
