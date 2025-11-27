const modalbtn = document.querySelector(".open-modal-btn")
const modalProducts = document.querySelector(".modal")
const closeModal = document.querySelector(".close-modal")
async function showModalProducts(){
    const response = await fetch(`api/loadProducts.php?userid=${user.data.id}`);
    const products = await response.json();
    const productsContainer = document.querySelector("#modal-products-body")
    productsContainer.innerHTML = ""
    products.data.forEach(element => {
        const div = document.createElement("tr")
        div.innerHTML = `
                    <td>${element.codigo}</td>
                        <td>${element.nome}</td>
                        <td>R$ ${element.valor}</td>
                    <td>
                        <button class="btn btn-primary add-product-btn" id=${element.id}>
                            <i class="fas fa-plus"></i> Adicionar
                        </button>
                    </td>
        `
        productsContainer.appendChild(div)
    });
}
modalbtn.addEventListener("click", async () => {
    modalProducts.classList.add("active")
    await showModalProducts()
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

buscarP.addEventListener("click", async () => {
    buscarP.classList.add("active")
    addP.classList.remove("active")
    search.classList.add("active")
    add.classList.remove("active")
    await showModalProducts()
})

const paymentsOptions = document.querySelector(".payment-options")

async function loadPag() {
    const response = await fetch("api/formPag.php")
    const pagamentos = await response.json();
    console.log(pagamentos);
    pagamentos.data.forEach(element => {
        const div = document.createElement("div")
        div.classList.add("payment-option")
        div.classList.add(element.id)
        div.innerHTML = `<i class="${element.simbolo}"></i>
                         <p>${element.nome}</p>`
        paymentsOptions.appendChild(div)
    });
}
loadPag()

const pagOptions = document.querySelectorAll(".payment-option")
let last
let lastId
addEventListener("click", (e) => {
    if(e.target.classList[0] == "payment-option"){
        if (last) {
            last.classList.remove("active")
        }
        e.target.classList.add("active")
        last = e.target
        lastId = e.target.classList[1]
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


async function addToCart(productId) {
    const response = await fetch(`api/productCart.php?productid=${productId}`);
    const products = await response.json();
    const productsContainer = document.querySelector("#products-table-body")
    console.log(products);
    toast[products.type](products.message);
    products.data.forEach(element => {
        const div = document.createElement("tr")
        div.id = `${element.id}`
        div.innerHTML = `
                                    <td>${element.codigo}</td>
                                    <td>${element.nome}</td>
                                    <td>
                                        <input type="number" class="quantity-input" value="1" min="1">
                                    </td>
                                    <td>R$ ${element.valor}</td>
                                    <td class="product-total">R$ ${element.valor}</td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="action-btn delete-btn" id="${element.id}" title="Remover">
                                                <i class="fas fa-trash" id="${element.id}"></i>
                                            </button>
                                        </div>
                                    </td>
        `
        productsContainer.appendChild(div)
    });
}

addEventListener("click", (e) => {
    if (e.target.classList.contains("add-product-btn")) {
        const productId = e.target.id;
        addToCart(productId);
    }

    if(e.target.classList[1] == "fa-trash" || e.target.classList[1] == "delete-btn"){
        const productId = e.target.id;
        const productRow = document.getElementById(productId);
        productRow.remove();
    }
})

const subTotal = document.querySelector("#subtotal");
const total = document.querySelector("#total");
const discount = document.querySelector("#discount");
const discountInput = document.querySelector("#coupon");
const cpfClient = document.querySelector("#customer-cpf");
let cupomClient = false
cpfClient.addEventListener("input", (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
    if(value.length == 14){
        cupomClient = true
        return;
    } 
});
let cupomId;
discountInput.addEventListener("input", async (e) => {
    
    const response = await fetch(`api/getCupons.php?code=${e.target.value}&id=${user.data.id}`);
    const cupom = await response.json();
    console.log(cupom);
    if(cupom.type == "success"){
        cupomId = cupom.data[0].id;
        let sum = 0;
            const totalCells = document.querySelectorAll(".product-total");
            totalCells.forEach(cell => {
            const value = parseFloat(cell.textContent.replace("R$ ", ""));
            sum += value;
        });
        toast[cupom.type](cupom.message);
        if(cupomClient){
            discountValue = (sum * cupom.data[0].desconto) / 100 + 5;
            discount.innerHTML = `R$ ${discountValue.toFixed(2)}`;
            cupomClient = false
        }else{
            const discountValue = (sum * cupom.data[0].desconto) / 100;
            discount.innerHTML = `R$ ${discountValue.toFixed(2)}`;
        }
    }else{
        discount.innerHTML = `R$ 0.00`;
    }
})

addEventListener("change", (e) => {
    if(e.target.classList.contains("quantity-input")){
        const quantity = e.target.value;
        const productRow = e.target.closest("tr");
        const priceCell = productRow.querySelector("td:nth-child(4)");
        const totalCell = productRow.querySelector(".product-total");
        const price = parseFloat(priceCell.textContent.replace("R$ ", ""));
        const total = (price * quantity).toFixed(2);
        totalCell.textContent = `R$ ${total}`;
    }

})

addEventListener("click", () => {
    let sum = 0;
    const totalCells = document.querySelectorAll(".product-total");
    totalCells.forEach(cell => {
        const value = parseFloat(cell.textContent.replace("R$ ", ""));
        sum += value;
    });

    subTotal.textContent = `R$ ${sum.toFixed(2)}`;
    total.textContent = `R$ ${(sum.toFixed(2) - parseFloat(discount.textContent.replace("R$ ", ""))).toFixed(2)}`;
})


const productCode = document.querySelector("#product-code");
const addProductByCode = document.querySelector("#add-product");

addProductByCode.addEventListener("click", async (e) => {
    e.preventDefault();
    const response = await fetch(`api/getProducts.php?code=${productCode.value}`);
    const product = await response.json();
    console.log(product);
    if(product.type == "success"){
        addToCart(product.data[0].id);
    }else{
        toast[product.type](product.message);
    }
});


const confirmSale = document.querySelector("#confirm-sale");
confirmSale.addEventListener("click", async (e) => {
    const response = await fetch(`api/vendas.php?user=${user.data.id}&formpag=${lastId}&cupom=${cupomId}&total=${total.textContent.replace("R$ ","")}`);
    const cupom = await response.json();
    console.log(cupom);
    toast[cupom.type](cupom.message);
    if(cupom.type == "success"){
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
});

const pdvUsersName = document.querySelector("#pdv-user-name");
pdvUsersName.innerHTML = user.data.nome;