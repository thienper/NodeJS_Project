const User = require("../../models/user.model")
var md5 = require('md5');


// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng kí tài khoản"
    });
}
// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const exitsEmail = await User.findOne({
        email: req.body.email
    })
    if (exitsEmail) {
        req.flash("error", "Đã tồn tại tài khoản với email này")
        res.redirect("back")
        return;
    }

    req.body.password = md5(req.body.password)
    const user = new User(req.body)
    await user.save()

    res.cookie("tokenUser", user.tokenUser)
    req.flash("success", "Đăng kí thành công")
    res.redirect("/")
}