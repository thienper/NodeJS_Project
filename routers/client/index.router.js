// Routes
const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const searchRouter = require("./search.router");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const cartRouter = require("./cart.router")
const checkoutRouter = require("./checkout.router")
const user = require("./user.router")

module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId)

    app.use("/", homeRouter)

    app.use("/products", productRouter)

    app.use("/search", searchRouter)

    app.use("/cart", cartRouter)

    app.use("/checkout", checkoutRouter)

    app.use("/user", user)


}