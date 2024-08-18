// [GET] /products
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



