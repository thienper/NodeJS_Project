const Product = require("../../models/product.model")
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });
    products.forEach(item => {
        item.priceNew = (item.price - (item.price * (item.discountPercentage / 100))).toFixed(0)
    })
    console.log(products);

    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang Sản Phẩm",
        products: products
    });
}


