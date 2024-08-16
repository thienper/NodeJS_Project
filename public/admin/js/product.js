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
//Trash
const buttonTrash = document.querySelectorAll("[button-trash]")
if (buttonTrash.length > 0) {
    const formTrash = document.querySelector("#form-trash");
    const path = formTrash.getAttribute("data-path")
    buttonTrash.forEach(button => {
        button.addEventListener("click", () => {
            console.log(path)
            formTrash.action = path;
            formTrash.submit();
        })
    })
}
// Delete Forever
const buttonsDeleteForever = document.querySelectorAll("[button-delete-forever]");
if (buttonsDeleteForever.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item-forever");
    const path = formDeleteItem.getAttribute("data-path")
    buttonsDeleteForever.forEach(button => {
        button.addEventListener("click", () => {
            //console.log(button)
            const isConfirm = confirm("Bạn có chắc muốn xóa VĨNH VIỄN hay không?")
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
// Return Item
const buttonsReturnItem = document.querySelectorAll("[button-return]");
if (buttonsReturnItem.length > 0) {
    const formDeleteItem = document.querySelector("#form-return-item");
    const path = formDeleteItem.getAttribute("data-path")
    buttonsReturnItem.forEach(button => {
        button.addEventListener("click", () => {
            //console.log(button)
            const isConfirm = confirm("Bạn có chắc muốn chuyển sản phẩm trở lại không?")
            if (isConfirm) {
                const id = button.getAttribute("data-id");
                //console.log(id)
                const action = `${path}/${id}`
                console.log(action)
                formDeleteItem.action = action
                formDeleteItem.submit();
            }
        })
    })
}