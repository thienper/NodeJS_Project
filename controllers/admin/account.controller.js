const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")

const systemConfig = require("../../config/system.js")
var md5 = require('md5');

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Account.find(find).select("-password -token")
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

    const emailExist = await Account.findOne({
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
    const account = new Account(req.body);
    await account.save();
    req.flash('success', 'Tạo account thành công');
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
}
module.exports.edit = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false
    }
    try {
        const record = await Account.findById(find)
        const roles = await Role.find({ deleted: false })
        res.render("admin/pages/accounts/edit.pug", {
            pageTitle: "Chỉnh sửa tài khoản",
            record: record,
            roles: roles
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }

}
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    const OldPassword = await Account.findById(req.params.id);
    const emailExist = await Account.findOne({
        _id: { $ne: id },
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        return res.redirect(`back`);
    }
    if (req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        req.body.password = OldPassword.password;
    }
    try {
        await Account.updateOne({ _id: req.params.id }, req.body)
        req.flash('success', `Cập nhật thành công`);
    } catch (error) {
        req.flash('error', `Cập nhật thất bại`);
    }
    res.redirect("back");

}
