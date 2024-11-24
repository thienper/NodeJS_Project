const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system.js")
const createTreeHelper = require("../../helpers/createTree.js")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
const pagination = require("../../helpers/pagination.js")


// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    //đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status;
    }
    //đoạn search
    const objSearch = searchHelper(req.query);
    if (objSearch.regex) {
        find.title = objSearch.regex;
    }
    //Tách trang
    const countProductCategory = await ProductCategory.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            limitItem: 4,
            currentPage: 1
        },
        req.query,
        countProductCategory

    )
    //Sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.position = "desc"
    }
    //end sort
    const record = await ProductCategory.find(find)
        .sort(sort) //desc : giảm dần,asc : tăng dần
    // .limit(objectPagination.limitItem)
    // .skip(objectPagination.skip);
    const newRecord = createTreeHelper.tree(record)
    //console.log(newRecord)

    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        record: newRecord,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objectPagination
    });
}
// [GET] /admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await ProductCategory.updateOne({ _id: id }, { status: status });

    //res.redirect : Chuyển hướng trang, thuộc tính back: chuyển hướng lại trang trước đó
    res.redirect("back")
}
// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {

    const type = req.body.type
    const ids = req.body.ids.split(", ");
    //console.log(ids)
    switch (type) {
        case "inactive":
            await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            break;
        case "active":
            await ProductCategory.updateMany({ _id: { $in: ids } }, { status: "active" })
            break;
        case "delete-all":
            await ProductCategory.updateMany({ _id: ids }, { deleted: true, deletedAt: new Date() })
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")
                position = parseInt(position)
                // console.log(id)
                // console.log(position)
                await ProductCategory.updateOne({ _id: id }, { position: position });
            }
            break;
        default:
            break;
    }
    res.redirect("back")
}
//[DELETE] /admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {

    const id = req.params.id;

    //await Product.deleteOne({ _id: id })
    await Product.updateOne({ _id: id }, { deleted: "true", deletedAt: new Date() })
    req.flash('success', `Xóa thành công 1 sản phẩm`);
    res.redirect("back")
}
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    }

    const record = await ProductCategory.find(find);

    const newRecord = createTreeHelper.tree(record);
    //console.log(newRecord)
    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        record: newRecord
    });
}
// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    const permission = res.locals.role[0].permisstions;
    console.log(permission)
    if (permission.includes("products-category_create")) {
        if (req.body.position == "") {
            const count = await ProductCategory.countDocuments();
            req.body.position = count + 1;
        } else {
            req.body.position = parseInt(req.body.position)
        }
        const record = new ProductCategory(req.body);
        await record.save()

        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    } else {
        res.send("403");
        return;
    }


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