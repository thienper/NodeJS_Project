const mongoose = require("mongoose");
const generate = require("../helpers/generate")

const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 10
    },

},
    {
        timestamps: true,
    }
);
const forgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgotPassword");
module.exports = forgotPassword;