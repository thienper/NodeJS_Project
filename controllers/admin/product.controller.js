const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")

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
    let objectPagination = {
        limitItem: 4,
        currentPage: 1
    }
    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    //Đếm số lượng document
    const countProduct = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProduct / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip)
    //console.log(products)
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objSearch.keyword,
        pagination: objectPagination
    });
}