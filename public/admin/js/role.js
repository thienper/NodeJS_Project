
//Permisstions
const tablePermisstions = document.querySelector("[table-permisstions]")
if (tablePermisstions) {
    const buttonSubmit = document.querySelector("[button-submit]")
    buttonSubmit.addEventListener("click", () => {
        let Permisstions = []

        const rows = tablePermisstions.querySelectorAll("[data-name]")

        rows.forEach(row => {
            const name = row.getAttribute("data-name")
            const inputs = row.querySelectorAll("input")
            if (name == "id") {
                inputs.forEach(input => {
                    //console.log(input.value)
                    const id = input.value;
                    Permisstions.push({
                        id: id,
                        permisstions: []
                    })
                })
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if (checked) {
                        Permisstions[index].permisstions.push(name)

                    }
                })
            }
        })
        console.log(Permisstions)
        if (Permisstions.length > 0) {
            const formChangePermisstions = document.querySelector("#form-change-permisstions");
            const inputPermisstions = formChangePermisstions.querySelector("input[name='permisstions']")
            inputPermisstions.value = JSON.stringify(Permisstions);
            formChangePermisstions.submit()
        }
    });

}
//End permisstions
//Hiển thị permisstions
const dataRecord = document.querySelector("[data-record]");
if (dataRecord) {
    const record = JSON.parse(dataRecord.getAttribute("data-record"))
    const tablePermisstions = document.querySelector("[table-permisstions]")
    record.forEach((record, index) => {
        const permisstions = record.permisstions
        //console.log(permisstions)
        permisstions.forEach(permisstions => {
            const row = tablePermisstions.querySelector
                (`[data-name='${permisstions}']`)
            const input = row.querySelectorAll("input")[index]
            input.checked = true;

        })
    })
}
//End Hiển thị permisstions