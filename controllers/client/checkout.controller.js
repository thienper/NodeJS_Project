const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const Order = require("../../models/order.model")
const productHelper = require("../../helpers/products")

// [GET] /checkout
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    })

    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const product_id = item.product_id;
            const productInfo = await Product.findOne({
                _id: product_id,
            }).select("title thumbnail slug price discountPercentage")

            //Giá mới cho từng sản phẩm
            productInfo.priceNew = productHelper.priceNewproduct(productInfo)
            //Tổng tiền từng sản phẩm
            item.totalPrice = productInfo.priceNew * item.quantity
            //Gán ds sản phẩm cho biến productInfo
            item.productInfo = productInfo

        }
    }
    //Tổng tiền tất cả sản phẩm
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)
    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    })
}
// [POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    const cart = await Cart.findOne({
        _id: cartId
    })

    const products = [];
    for (const product of cart.products) {
        const objectProduct = {
            product_id: product.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: product.quantity,
        };
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("price discountPercentage");

        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objectProduct);
    }


    const orderInfo = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }

    const order = new Order(orderInfo);
    await order.save();
    //Cap nhat lai gio hang
    await Cart.updateOne({
        _id: cartId,

    }, {
        products: []
    });

    res.redirect(`/checkout/success/${order.id}`);
}
// [GET] /success/:orderId
module.exports.success = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({ _id: orderId })
    console.log(order)

    for (const product of order.products) {
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("title thumbnail")

        product.productInfo = productInfo
        product.priceNew = productHelper.priceNewproduct(product)
        product.totalPrice = product.priceNew * product.quantity

    }
    order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0)
    console.log(order)
    res.render("client/pages/checkout/success.pug", {
        pageTitle: "Đặt hàng thành công",
        order: order
    })
}