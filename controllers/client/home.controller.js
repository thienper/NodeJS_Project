const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")

// [GET] /
module.exports.index = async (req, res) => {
    // Lấy ra các sản phẩm nổi bật
    const productFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active",
    })
    // Lay het san pham noi bat
    const newProducts = productsHelper.priceNewproducts(productFeatured)
    // Lay ra san pham moi nhat
    const productsNew = await Product.find({
        deleted: false,
        status: "active",
    }).sort({ position: "desc" }).limit(6)
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang Chủ",
        productsFeatured: newProducts,
        productsNew: productsNew
    });
}