const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system.js")
const createTreeHelper = require("../../helpers/createTree.js")


// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const record = await Role.find(find)
    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm Quyền",
        record: record
    })
}
// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const record = await Role.find(find)
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới sản phẩm"

    })
}
// [PÓT] /admin/roles/create
module.exports.createPost = async (req, res) => {
    console.log(req.body)
    const record = new Role(req.body);
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}