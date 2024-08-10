module.exports.index = (req, res) => {
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang Danh Sách Sản Phẩm"
    });
}