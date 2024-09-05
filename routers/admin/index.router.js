const dashboardRouter = require("./dashboard.router")
const systemConfig = require("../../config/system")
const productRouter = require("./product.router")
const trashRouter = require("./trash.router")
const productCategory = require("./product-category.router")
const roleRouter = require("./role.router")
const accountRouter = require("./account.router")
const authRouter = require("./auth.router")


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter)
    app.use(PATH_ADMIN + "/products/trash", trashRouter)
    app.use(PATH_ADMIN + "/products", productRouter)
    app.use(PATH_ADMIN + "/products-category", productCategory)
    app.use(PATH_ADMIN + "/roles", roleRouter)
    app.use(PATH_ADMIN + "/accounts", accountRouter)
    app.use(PATH_ADMIN + "/auth", authRouter)

};