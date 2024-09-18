const Account = require("../../models/account.model")
const md5 = require("md5")

// [GET] /admin/my-account
module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index.pug", {
        pageTitle: "Trang thông tin tài khoản"
    });
}
// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit.pug", {
        pageTitle: "Trang chỉnh sửa"
    });
}
// [PATCH] /admin/my-account/editPatch
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id
    console.log(id)
    const emailExist = await Account.findOne({
        _id: { $ne: id },
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {
        req.flash('error', 'Email đã tồn tại');
        return res.redirect(`back`);
    } else {
        if (req.body.password) {
            req.body.password = md5(req.body.password)
        } else {
            delete req.body.password
        }
        await Account.updateOne({ _id: id }, req.body)
        req.flash('success', `Cập nhật thành công`);
        console.log(req.body)
    }
    res.redirect("back");
}