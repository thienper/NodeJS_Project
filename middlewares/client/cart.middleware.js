const ProductCategory = require("../../models/product-category.model")
const createTreeHelper = require("../../helpers/createTree.js")
const Cart = require("../../models/cart.model.js")


// [GET] /
module.exports.cartId = async (req, res, next) => {
    if (!req.cookies.cartId) {

        // Tạo giỏ hàng
        const cart = new Cart();
        await cart.save();

        // Tạo biến thời gian tồn tại của giỏ hàng khi chưa đăng nhập
        const expiresCookies = 1000 * 60 * 60 * 24 * 365

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookies)
        })
    } else {
        // Lấy giỏ hàng ra
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        })
        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        res.locals.miniCart = cart
    }
    next();
}