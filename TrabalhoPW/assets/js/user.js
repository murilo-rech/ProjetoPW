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

