const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    //console.log(req.query.status)
    //Đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    //Đoạn search

    const objSearch = searchHelper(req.query);
    if (objSearch.regex) {
        find.title = objSearch.regex;
    }
    //Tách trang
    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            limitItem: 4,
            currentPage: 1
        },
        req.query,
        countProduct

    )

    const products = await Product.find(find)
        .sort({ position: "asc" }) //desc : giảm dần,asc : tăng dần
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)
    //console.log(products)
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objectPagination
    });
}
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    req.flash('info', 'Cập nhật trạng thái thành công');
    //res.redirect : Chuyển hướng trang, thuộc tính back: chuyển hướng lại trang trước đó
    res.redirect("back")
}
// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {

    const type = req.body.type
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash('info', `Cập nhật thành công của ${ids.length} sản phẩm`);
            break;
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('info', `Cập nhật thành công của ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: ids }, { deleted: true, deletedAt: new Date() })
            req.flash('info', `Xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")
                position = parseInt(position)
                // console.log(id)
                // console.log(position)
                await Product.updateOne({ _id: id }, { position: position });
            }
            req.flash('info', `Đẫ đổi vị trí thành công ${ids.length} sản phẩm`);
            break;
        default:
            break;
    }
    res.redirect("back")
}
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {

    const id = req.params.id;

    //await Product.deleteOne({ _id: id })
    await Product.updateOne({ _id: id }, { deleted: "true", deletedAt: new Date() })
    req.flash('info', `Xóa thành công 1 sản phẩm`);
    res.redirect("back")
}