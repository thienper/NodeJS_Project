console.log("OK")
//Button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);

            } else {
                url.searchParams.delete("status");
            }
            //console.log(url.href)
            window.location.href = url.href;
        })
    })
}
// Search
const formSearch = document.querySelector("#form-search");
//console.log(formSearch)
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value
        //console.log(e.target.elements.keyword.value)
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}
//Checkbox Multi
const checkboxMullti = document.querySelector("[checkbox-multi]");
if (checkboxMullti) {
    const inputCheckAll = checkboxMullti.querySelector("input[name='checkall']")
    const inputId = checkboxMullti.querySelectorAll("input[name='id']")
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputId.forEach(input => {
                input.checked = false;
            })
        }
    })
    inputId.forEach(input => {
        input.addEventListener("click", () => {
            // Trả về độ dài số lượng những ô input đã check 
            const countChecked = checkboxMullti.querySelectorAll("input[name='id']:checked").length
            if (countChecked == inputId.length) {
                inputCheckAll.checked = true
            } else {
                inputCheckAll.checked = false
            }
        }
        )
    })
}
// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        // prevenDefault : ngăn load lại trang
        e.preventDefault();

        const checkboxMullti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMullti.querySelectorAll(
            "input[name='id']:checked"
        )
        //console.log(inputsChecked)

        const typeChange = e.target.elements.type.value
        if (typeChange == "delete-all") {
            const isConfirm = confirm("bạn có muốn xóa không?")
            if (!isConfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']")
            //console.log(inputIds)
            inputsChecked.forEach(input => {
                const id = input.value;
                if (typeChange == "change-position") {
                    const position = input
                        .closest("tr")
                        .querySelector("input[name='position']")
                        .value;

                    console.log(`${id}-${position}`)
                    ids.push(`${id}-${position}`)
                } else {
                    ids.push(id)
                }
            });

            console.log(ids.join(", "))
            inputIds.value = ids.join(", ")
            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm")
        }
    })
}
