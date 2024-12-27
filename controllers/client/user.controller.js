const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgotPassword.model")
var md5 = require('md5');
const generateHelper = require("../../helpers/generate")

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

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login.pug", {
        pageTitle: "Đăng nhập"
    });
}
// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        req.flash("error", "Email tồn tại")
        res.redirect("back")
        return;
    }
    if (md5(password) != user.password) {
        req.flash("error", "Sai mật khẩu")
        res.redirect("back")
        return;
    }
    if (user.status == "locked") {
        req.flash("error", "Tài khoản đang bị khoá")
        res.redirect("back")
        return;
    }
    if (user.status == "inactive") {
        req.flash("error", "Tài khoản đã dừng hoạt động")
        res.redirect("back")
        return;
    }

    res.cookie("tokenUser", user.tokenUser)

    res.redirect("/")

}
// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect(`/`)
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ"
    });
}
// [GET] /user/password/forgotPassword
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password.pug", {
        pageTitle: "Quên mật khẩu"
    });
}
// [POST] /user/password/forgotPassword
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email

    const user = await User({
        email: email,
        deleted: false
    })
    //Neu khong ton tai email
    if (!user) {
        res.flash("error", "Email không tồn tại")
        res.redirect("back")
        return;
    }
    //Luu thong tin vao dataBase
    const objectForgotPassword = {
        email: email,
        otp: generateHelper.generateRandomNumber(5),
        expireAt: 180
    }
    console.log(objectForgotPassword)
    const existObjectForgotPassword = await ForgotPassword.findOne({
        email: email
    })
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    // if (existObjectForgotPassword) {
    //     await ForgotPassword.updateOne(forgotPassword)
    // }
    await forgotPassword.save()
    // Neu ton tai email, Gui ma OTP qua email




    // res.render("client/pages/user/forgot-password.pug", {
    //     pageTitle: "Quên mật khẩu"
    // });
    res.send("OK")
}