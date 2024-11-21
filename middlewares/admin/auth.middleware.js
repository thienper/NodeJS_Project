const { application } = require("express");
const systemConfig = require("../../config/system")
const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")

module.exports.requireAuth = async (req, res, next) => {

    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        //console.log(req.cookies.token)
        const user = await Account.findOne({ token: req.cookies.token }).select("-password")
        if (!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {
            const role = await Role.find({
                _id: user.role_id
            }).select("title permisstions")
            res.locals.user = user;
            res.locals.role = role;
            next();
        }
    }

}