const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
const pagination = require("../../helpers/pagination.js")
const systemConfig = require("../../config/system.js")
const ProductCategory = require("../../models/product-category.model")
const createTreeHelper = require("../../helpers/createTree.js")


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
    //Sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.position = "desc"
    }
    //End sort

    const products = await Product.find(find)
        .sort(sort) //desc : giảm dần,asc : tăng dần
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

    req.flash('success', 'Cập nhật trạng thái thành công');
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
            req.flash('success', `Cập nhật thành công của ${ids.length} sản phẩm`);
            break;
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('success', `Cập nhật thành công của ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: ids }, { deleted: true, deletedAt: new Date() })
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")
                position = parseInt(position)
                // console.log(id)
                // console.log(position)
                await Product.updateOne({ _id: id }, { position: position });
            }
            req.flash('success', `Đẫ đổi vị trí thành công ${ids.length} sản phẩm`);
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
    req.flash('success', `Xóa thành công 1 sản phẩm`);
    res.redirect("back")
}
// [GET] /admin/products/trash
module.exports.trash = async (req, res) => {
    let find = {
        deleted: true
    }
    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            limitItem: 4,
            currentPage: 1
        },
        req.query,
        countProduct

    )
    const trashProduct = await Product.find({ deleted: true })
    console.log(trashProduct)
    res.render("admin/pages/trash/index.pug", {
        pageTitle: "Trang thùng rác",
        products: trashProduct,
        pagination: objectPagination
    });
}
// [DELETE] /admin/products/trash/delete/:id
module.exports.deleteItemForever = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await Product.deleteOne({ _id: id })
    req.flash('success', `Xóa thành công 1 sản phẩm`);
    res.redirect("back")
}
// [GET] /admin/products/trash/return/:id
module.exports.returnItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { deleted: false })
    req.flash('success', `Chuyển sản phẩm thành công`);
    res.redirect("back")
}
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    }

    const category = await ProductCategory.find(find);

    const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
        category: newCategory
    });
}
// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position == "") {
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    //console.log(req.file)
    const product = new Product(req.body);
    await product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}
// [GET] /admin/products/edit
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.find(find);
        const category = await ProductCategory.find({
            deleted: false
        });
        const newCategory = createTreeHelper.tree(category);
        //product = product[0]
        console.log(product.title)
        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Chỉnh sửa sản phẩm",
            products: product,
            category: newCategory
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}
// [PATCH] /admin/products/edit
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    try {
        await Product.updateOne({ _id: req.params.id }, req.body)
        req.flash('success', `Cập nhật thành công`);
    } catch (error) {
        req.flash('error', `Cập nhật thất bại`);
    }
    res.redirect("back");

}
// [GET] /admin/products/detail
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.find(find);
        //console.log(product)
        res.render("admin/pages/products/detial.pug", {
            pageTitle: product.title,
            products: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

}