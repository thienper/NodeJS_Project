//Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path")
    console.log(path)

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