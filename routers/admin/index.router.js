const dashboardRouter = require("./dashboard.router")
const systemConfig = require("../../config/system")
const productRouter = require("./product.router")
const trashRouter = require("./trash.router")
const productCategory = require("./product-category.router")
const roleRouter = require("./role.router")
const accountRouter = require("./account.router")
const authRouter = require("./auth.router")
const myAccountRouter = require("./my-account.router")
const authMiddleware = require("../../middlewares/admin/auth.middleware")


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(
        PATH_ADMIN + "/dashboard",
        authMiddleware.requireAuth,
        dashboardRouter
    )
    app.use(
        PATH_ADMIN + "/products/trash",
        authMiddleware.requireAuth,
        trashRouter
    )
    app.use(
        PATH_ADMIN + "/products",
        authMiddleware.requireAuth,
        productRouter
    )
    app.use(
        PATH_ADMIN + "/products-category",
        authMiddleware.requireAuth,
        productCategory
    )
    app.use(
        PATH_ADMIN + "/roles",
        authMiddleware.requireAuth,
        roleRouter
    )
    app.use(
        PATH_ADMIN + "/accounts",
        authMiddleware.requireAuth,
        accountRouter
    )
    app.use(
        PATH_ADMIN + "/my-account",
        authMiddleware.requireAuth,
        myAccountRouter
    )
    app.use(
        PATH_ADMIN + "/auth",
        authRouter
    )

};