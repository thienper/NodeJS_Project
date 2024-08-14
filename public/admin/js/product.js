//Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path")
    //console.log(path)

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let statusChange = statusCurrrent == "active" ? "inactive" : "active";
            console.log(statusChange)

            const action = path + `/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path")
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            //console.log(button)
            const isConfirm = confirm("Bạn có chắc muốn xóa hay không?")
            if (isConfirm) {
                const id = button.getAttribute("data-id");
                //console.log(id)
                const action = `${path}/${id}?_method=DELETE`
                console.log(action)
                formDeleteItem.action = action
                formDeleteItem.submit();
            }
        })
    })
}