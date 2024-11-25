const Cart = require("../../models/cart.model")

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId; // req.params là lấy giá trị từ trên path
    const quantity = parseInt(req.body.quantity); // req.body là lấy giá trị từ form
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    })
    console.log(cart.products)
    const existProduct = cart.products.find(item => item.product_id == productId)
    if (existProduct) {
        const quantityNew = quantity + existProduct.quantity;
        console.log(quantityNew)
        await Cart.updateOne({
            _id: cartId,
            'products.product_id': productId
        }, {
            $set: {
                'products.$.quantity': quantityNew
            }
        }
        )
        req.flash("success", "Đã thêm sản phẩm vào giỏ hàng !")
        res.redirect("back");
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }

        await Cart.updateOne({
            _id: cartId
        }, {
            $push: { products: objectCart }
        })

        req.flash("success", "Đã thêm sản phẩm vào giỏ hàng !")
        res.redirect("back");
    }

}