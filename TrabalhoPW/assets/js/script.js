// FAQ RENDERING

const features = document.querySelector(".features");

function renderProducts (faqs) {
    features.innerHTML = "";
    faqs.forEach(faq => {
        
        const home = document.createElement("div");
        home.classList.add("feature-card");
        home.innerHTML = `<i class="${faq.simbolo}"></i>
                        <h3>${faq.pergunta}</h3>
                        <p>${faq.resposta}</p>`
        features.appendChild(home);
    });

}

async function renderFaq(){
    const response = await fetch("api/faq.php");
    const faqs = await response.json();

    renderProducts(faqs.data)
    
    toast[faqs.type](faqs.message);
}
renderFaq();

// LOGIN RENDERING
const loginBtn = document.querySelector("#login-btn");
const panelLogin = document.querySelector("#auth-modal")
const closeLogin = document.querySelector(".close-modal");
let currentUser = false;
loginBtn.addEventListener("click", () => {
    panelLogin.classList.add("active")
})

closeLogin.addEventListener("click", () => {
    panelLogin.classList.remove("active")
})

const loginTab = document.querySelector("#login-tab")
const registerTab = document.querySelector("#register-tab")
const registerBtn = document.querySelector("#register")
const entrarBtn = document.querySelector("#entrar")

registerBtn.addEventListener("click", () => {
    
    registerTab.classList.add("active")
    loginTab.classList.remove("active")

    registerBtn.classList.add("active")
    entrarBtn.classList.remove("active")
})
entrarBtn.addEventListener("click", () => {

    loginTab.classList.add("active")
    registerTab.classList.remove("active")

    entrarBtn.classList.add("active")
    registerBtn.classList.remove("active")
})

const registerSubmit = document.querySelector("#register-submit");
const loginSubmit = document.querySelector("#login-submit");

registerSubmit.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(document.querySelector("#formRegister"));
    const response = await fetch("api/register.php", {
        method: "POST",
        body: formData
    });
    const register = await response.json();
    toast[register.type](register.message);
    if(register.type == "success"){
        setTimeout(() => {
            panelLogin.classList.remove("active")
            localStorage.setItem("user", JSON.stringify(register));
        }, 1000);

        loginBtn.innerHTML = '<i class="fas fa-user"></i> ' + register.data.nome;
        currentUser = true;
    }
});

loginSubmit.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(document.querySelector("#formLogin"));
    const response = await fetch("api/login.php", {
        method: "POST",
        body: formData
    });

    const login = await response.json();
    console.log(login);
    toast[login.type](login.message);

    if(login.type == "success"){
        setTimeout(() => {
            panelLogin.classList.remove("active")
            localStorage.setItem("user", JSON.stringify(login));
        }, 1000);

        loginBtn.innerHTML = '<i class="fas fa-user"></i> ' + login.data.nome;
        currentUser = true;
    }
});
if(currentUser){
    loginBtn.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.nome;
}

const myAccountBtn = document.querySelector("#my-account-btn");
myAccountBtn.addEventListener("click", () => {
    if(!currentUser){
        toast.info("Por favor, faça login para acessar sua conta.");
    }
    else{
        window.location.href = "user.html";
    }
});

const pdv = document.querySelector("#pdv-link");
pdv.addEventListener("click", () => {
    if(!currentUser){
        toast.info("Por favor, faça login para acessar o PDV.");
    }
    else{
        window.location.href = "pdv.html";
    }
});


let user = JSON.parse(localStorage.getItem("user"));
if (user) {
    console.log(user);
    currentUser = true;
    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${user.data.nome}`;
}
