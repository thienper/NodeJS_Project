const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater")
mongoose.plugin(slug);

const orderSchema = new mongoose.Schema({
    //user_id: String,
    cart_id: String,
    userInfo: {
        fullName: String,
        phone: String,
        address: String
    },
    products: [
        {
            product_id: String,
            price: Number,
            quantity: Number,
            discountPercentage: Number
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;