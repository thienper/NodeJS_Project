const mongoose = require("mongoose");

const Product = mongoose.model('Product', {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean
}, 'products');


// aaaaaa

module.exports = Product;