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
// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ProductCategory.findOne({
            _id: id,
            deleted: false
        })
        const records = await ProductCategory.find({
            deleted: false
        })
        const newRecord = createTreeHelper.tree(records);

        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            record: newRecord
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }

}
// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position)

    await ProductCategory.updateOne({ _id: id }, req.body)

    res.redirect("back");
}