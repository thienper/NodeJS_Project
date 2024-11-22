const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")
const productsHelper = require("../../helpers/products")
const getCategoryHelper = require("../../helpers/products-category")

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
// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        deleted: false,
        status: "active",
    });
    // Lay ra ma danh muc con
    const listSubCategory = await getCategoryHelper.getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map(item => item.id)

    const products = await Product.find({
        product_category_id: { $in: [category.id, ...listSubCategoryId] },
        deleted: false
    }).sort({ position: "desc" });

    console.log(products)
    // Lay gia moi
    const newProducts = productsHelper.priceNewproducts(products)
    res.render("client/pages/products/index.pug", {
        pageTitle: category.title,
        products: newProducts
    });
}


