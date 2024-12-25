const mongoose = require("mongoose");
const generate = require("../helpers/generate")

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,

},
    {
        timestamps: true,
    }
);
const User = mongoose.model("Users", userSchema, "users");
module.exports = User;