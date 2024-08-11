const Product = require("../../models/product.model")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    //console.log(req.query.status)
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    if (req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        filterStatus[index].class = "active"
    } else {
        filterStatus[0].class = "active"
    }
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    let keyword = "";
    if (req.query.keyword) {
        keyword = req.query.keyword
        const regex = new RegExp(keyword, "i");
        find.title = regex;
    }
    const products = await Product.find(find)
    //console.log(products)
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}