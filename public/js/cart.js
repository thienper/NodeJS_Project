// Cập nhật lại số sản phẩm trong giỏ hàng
const inputQuantity = document.querySelectorAll("input[name='quantity']")
console.log(inputQuantity)
if (inputQuantity.length > 0) {
    inputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const product_id = input.getAttribute("product-id");
            const quantity = input.value;

            window.location.href = `cart/update/${product_id}/${quantity}`
        })
    })
}