const Acount = require("../../models/account.model")
var md5 = require('md5');
const systemConfig = require("../../config/system.js")


// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    const user = await Acount.findOne({ token: req.cookies.token })
    console.log(req.cookies.token);
    if (user) {
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    } else {
        res.render("admin/pages/auth/login.pug", {
            pageTitle: "Trang Đăng Nhập"
        });
    }

}
// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Acount.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        req.flash("error", "Email không tồn tại!");
        return res.redirect("back")
    }
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đã bị khóa");
        return res.redirect("back")
    }
    if (md5(password) == user.password) {
        req.flash("success", "Đăng nhập thành công!");
    } else {
        req.flash("error", "Mật khẩu không chính xác!");
        return res.redirect("back")
    }
    res.cookie("token", user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}
// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("token")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}