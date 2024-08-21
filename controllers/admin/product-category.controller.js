const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system.js")
const createTreeHelper = require("../../helpers/createTree.js")


// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const record = await ProductCategory.find(find);
    const newRecord = createTreeHelper.tree(record);

    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        record: newRecord
    });
}
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    }

    const record = await ProductCategory.find(find);

    const newRecord = createTreeHelper.tree(record);
    console.log(newRecord)
    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        record: newRecord
    });
}
// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position)
    }
    const record = new ProductCategory(req.body);
    await record.save()

    res.redirect(`${systemConfig.prefixAdmin}/products-category`);

}