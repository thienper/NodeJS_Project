module.exports.priceNewproducts = (products) => {
    const newProducts = products.map(item => {
        item.priceNew = (item.price - (item.price * (item.discountPercentage / 100))).toFixed(0)
        return item;
    })
    return newProducts;
}
module.exports.priceNewproduct = (product) => {
    const priceNew = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(0)
    return priceNew;
}