const modalbtn = document.querySelector(".open-modal-btn")
const modalProducts = document.querySelector(".modal")
const closeModal = document.querySelector(".close-modal")

modalbtn.addEventListener("click", () => {
    modalProducts.classList.add("active")
})
closeModal.addEventListener("click", () => {
    modalProducts.classList.remove("active")
})
addEventListener("keydown", (e) => {
    if (modalProducts.classList[1]) {
        if (e.key == "Escape") {
            modalProducts.classList.remove("active")
        }
    }
})
addEventListener("click", (e) => {
    if (e.target.classList[0] == "modal" && e.target.classList[1] == "active") {
        modalProducts.classList.remove("active")
    }
})

const buscarP = document.querySelector("#buscarP")
const addP = document.querySelector("#addP")
const search = document.querySelector("#search-tab")
const add = document.querySelector("#add-tab")

addP.addEventListener("click", () => {
    buscarP.classList.remove("active")
    addP.classList.add("active")
    search.classList.remove("active")
    add.classList.add("active")
})

buscarP.addEventListener("click", () => {
    buscarP.classList.add("active")
    addP.classList.remove("active")
    search.classList.add("active")
    add.classList.remove("active")
})

const paymentsOptions = document.querySelector(".payment-options")

async function loadPag() {
    const response = await fetch("api/formPag.php")
    const pagamentos = await response.json();
    console.log(pagamentos);
    pagamentos.data.forEach(element => {
        const div = document.createElement("div")
        div.classList.add("payment-option")
        div.innerHTML = `<i class="${element.simbolo}"></i>
                         <p>${element.nome}</p>`
        paymentsOptions.appendChild(div)
    });
}
loadPag()

const pagOptions = document.querySelectorAll(".payment-option")
let last
addEventListener("click", (e) => {
    if(e.target.classList[0] == "payment-option"){
        if (last) {
            last.classList.remove("active")
        }
        e.target.classList.add("active")
        last = e.target
    }
})
const user = JSON.parse(localStorage.getItem("user"))
console.log(user);


const addProduct = document.querySelector("#add-new-product")
document.querySelector("#user_id").value = user.data.id;


addProduct.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(document.querySelector("#formAdd"));
    const response = await fetch("api/insertProducts.php", {
        method: "POST",
        body: formData
    });
    const product = await response.json();
    toast[product.type](product.message);
})