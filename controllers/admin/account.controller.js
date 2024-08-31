const Acount = require("../../models/account.model")
const Role = require("../../models/roles.model")

const systemConfig = require("../../config/system.js")
var md5 = require('md5');

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Acount.find(find).select("-password -token")
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false

        })
        record.role = role
    }
    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Danh Sách Tài Khoản",
        record: records
    })
}
// [GET] /admin/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({ deleted: false })
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Tạo mới tài khoản",
        record: roles
    })
}
// [POST] /admin/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Acount.findOne({
        email: req.body.email,
        deleted: false
    });
    //console.log(emailExist)
    if (emailExist) {
        req.flash('error', 'Email đã tồn tại');
        return res.redirect(`back`);
    } else {
        req.body.password = md5(req.body.password)
    }
    const account = new Acount(req.body);
    await account.save();
    req.flash('success', 'Tạo account thành công');
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
}