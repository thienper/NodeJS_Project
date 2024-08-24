//console.log("OK")
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

                    //console.log(`${id}-${position}`)
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
// Thời gian hiển thị thông báo
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
//Up load image
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change", (e) => {
        console.log(e)
        const file = e.target.files[0]
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }

    })

}
//Sort
const sort = document.querySelector("[sort]");
if (sort) {
    let url = new URL(window.location.href);

    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    //Sắp xếp
    sortSelect.addEventListener("change", (e) => {
        //console.log(e.target.value)
        const value = e.target.value
        const [sortKey, sortValue] = value.split("-");

        url.searchParams.set("sortKey", sortKey)
        url.searchParams.set("sortValue", sortValue)

        window.location.href = url.href;
    })
    //Xóa sắp xếp
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")

        window.location.href = url.href;
    })
    //Thêm selected cho option
    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")
    if (sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`
        //console.log(stringSort)
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
        //console.log(optionSelected)
        optionSelected.selected = true
    }
}


//End Sort