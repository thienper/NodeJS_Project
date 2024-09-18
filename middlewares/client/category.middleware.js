const ProductCategory = require("../../models/product-category.model")
const createTreeHelper = require("../../helpers/createTree.js")

// [GET] /
module.exports.category = async (req, res, next) => {
    let find = {
        deleted: false
    };
    const ProductsCategory = await ProductCategory.find(find)
    const newProductsCategory = createTreeHelper.tree(ProductsCategory)

    res.locals.layoutProductsCategory = newProductsCategory
    next();
}