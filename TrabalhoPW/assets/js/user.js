const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

userName.innerHTML = user.data.nome
userEmail.innerHTML = user.data.email

const logout = document.querySelector("#logout-btn")
logout.addEventListener("click", () => {
    window.location.href = "index.html"
    localStorage.clear()
})

async function loadSistemas() {
    const response = await fetch("api/systems.php")
    const sistemas = await response.json();
    console.log(sistemas);
    
    const systemsDisp = document.querySelector(".systems-grid")
    sistemas.data.forEach(sistema => {
        const system = document.createElement("div")
        system.classList.add("system-card")
        if (sistema.disponibilidade == "online") {
                    system.innerHTML = `<i class="${sistema.simbolo}"></i>
                            <h4>${sistema.nome}</h4>
                            <p>${sistema.descricao}</p>
                            <button class="btn btn-primary btn-sm" id="${sistema.nome}">Acessar</button>`
        systemsDisp.appendChild(system)
        }else{
            system.innerHTML = `<i class="${sistema.simbolo}"></i>
                            <h4>${sistema.nome}</h4>
                            <p>${sistema.descricao}</p>`
        systemsDisp.appendChild(system)
        }
    });
    const btnPDV = document.querySelector("#PDV")

btnPDV.addEventListener("click", () => {
    window.location.href = "PDV.html"
})

    toast[sistemas.type](sistemas.message);
}
loadSistemas()

const modalCoupon = document.getElementById('coupon-modal');
const closeModal = document.querySelector('#close-coupon-modal');

console.log(closeModal);


document.getElementById('create-coupon-btn').addEventListener('click', () => {
    modalCoupon.classList.add('active');
});

closeModal.addEventListener('click', (e) => {
    modalCoupon.classList.remove('active');
});

const couponCount = document.querySelector("#coupon-count");
const couponsList = document.querySelector("#coupons-list");

document.getElementById('save-coupon').addEventListener('click', async () => {
    const response = await fetch('api/createCoupon.php?user_id=' + user.data.id, {
        method: 'POST',
        body: new FormData(document.getElementById('coupon-form'))
    });
    const result = await response.json();
    console.log(result);
    
    toast[result.type](result.message);

    if (result.type === 'success') {
        setTimeout(() => {
            modalCoupon.classList.remove('active');
        }, 500);
        document.getElementById('coupon-form').reset();
        loadCoupons();
    }
    
});


async function loadCoupons() {
    const response = await fetch("api/loadCupons.php?id=" + user.data.id)
    const coupons = await response.json();
    console.log(coupons);
    couponsList.innerHTML = "";
    couponCount.innerHTML = coupons.count + " cupons ativos";
    coupons.data.forEach(coupon => {
        const couponItem = document.createElement("div")
        couponItem.classList.add("coupon-item")
        couponItem.setAttribute("data-coupon-id", coupon.id)
        couponItem.innerHTML = `
                                <div class="coupon-badge">
                                    <i class="fas fa-tag"></i>
                                </div>
                                <div class="coupon-info">
                                    <div class="coupon-code">${coupon.codigo}</div>
                                    <div class="coupon-details">
                                        <span class="coupon-value"><i class="fas fa-percent"></i> ${coupon.desconto}% de desconto</span>
                                    </div>
                                </div>
                                <div class="coupon-actions">
                                    <button class="btn-icon btn-delete" title="Excluir cupom">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            `;
        couponsList.appendChild(couponItem)
    });
}
loadCoupons()

addEventListener("click", async (e) => {
    if (e.target.closest(".btn-delete")) {
        const couponItem = e.target.closest(".coupon-item");
        const couponId = couponItem.getAttribute("data-coupon-id");
        console.log(couponId);
        const response = await fetch("api/deleteCoupon.php?id=" + couponId)
        const result = await response.json();
        toast[result.type](result.message);
        if (result.type === "success") {
            couponItem.remove();
            loadCoupons();
        }
    }
});


