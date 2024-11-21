const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")


// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });
    const newProducts = productsHelper.priceNewproducts(products)
    //console.log(products);
    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang Sản Phẩm",
        products: newProducts
    });
}
// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const product = await Product.find(find);
        res.render("client/pages/products/detial.pug", {
            pageTitle: product.title,
            products: product
        });
    } catch (error) {
        res.redirect(`client/pages/products`);
    }
}



