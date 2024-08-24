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
// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    console.log(req.body)
    const record = new Role(req.body);
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}
// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        console.log(req.params)
        const id = req.params.id

        let find = {
            _id: id,
            deleted: false
        }

        const record = await Role.findOne(find)
        res.render("admin/pages/roles/edit", {
            pageTitle: "Sửa sản phẩm",
            record: record
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}
// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    console.log(req.body)
    const id = req.params.id
    await Role.updateOne({ _id: id }, req.body)
    req.flash("success", "Cập nhật quyền thành công")
    res.redirect("back")

}
// [GET] /admin/roles/permisstions
module.exports.permisstions = async (req, res) => {
    let find = {
        deleted: false
    }
    const record = await Role.find(find);
    res.render("admin/pages/roles/permisstions", {
        pageTitle: "Phân Quyền",
        record: record
    })
}
// [GET] /admin/roles/permisstions
module.exports.permisstionsPatch = async (req, res) => {
    const permisstions = JSON.parse(req.body.permisstions)
    for (const item of permisstions) {
        const id = item.id;
        const permisstions = item.permisstions
        await Role.updateOne({ _id: id }, { permisstions: permisstions })
    }
    req.flash("success", "Cập nhật phân quyền thành công")
    res.redirect("back");
}