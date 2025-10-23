// Dados de exemplo
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, code: "SM001", name: "Smartphone XYZ", price: 1299.99 },
    { id: 2, code: "NT002", name: "Notebook ABC", price: 2499.99 },
    { id: 3, code: "FO003", name: "Fone de Ouvido", price: 199.99 },
    { id: 4, code: "TB004", name: "Tablet 10\"", price: 899.99 },
    { id: 5, code: "MS005", name: "Mouse Gamer", price: 149.99 },
    { id: 6, code: "TC006", name: "Teclado Mecânico", price: 299.99 },
    { id: 7, code: "MN007", name: "Monitor 24\"", price: 799.99 },
    { id: 8, code: "IM008", name: "Impressora Laser", price: 499.99 }
];

// Estado da aplicação
let currentUser = null;
let cart = [];
let currentPage = 'home';

// Elementos DOM
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authModal = document.getElementById('auth-modal');
const productsModal = document.getElementById('products-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const loginSubmit = document.getElementById('login-submit');
const registerSubmit = document.getElementById('register-submit');
const openProductsModal = document.getElementById('open-products-modal');
const productsTableBody = document.getElementById('products-table-body');
const modalProductsBody = document.getElementById('modal-products-body');
const addProductBtn = document.getElementById('add-product');
const productCodeInput = document.getElementById('product-code');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const totalEl = document.getElementById('total');
const paymentOptions = document.querySelectorAll('.payment-option');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const confirmSaleBtn = document.getElementById('confirm-sale');
const modalTabs = document.querySelectorAll('.modal-tab');
const modalTabContents = document.querySelectorAll('.modal-tab-content');
const addNewProductBtn = document.getElementById('add-new-product');
const modalSearchInput = document.getElementById('modal-search');
const modalSearchBtn = document.getElementById('modal-search-btn');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há usuário logado
    checkLoginStatus();
    
    // Carregar produtos no modal
    loadModalProducts();
    
    // Configurar eventos
    setupEventListeners();
    
    // Atualizar carrinho
    updateCart();
});

// Verificar status de login
function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }
}

// Atualizar UI para usuário logado
function updateUIForLoggedInUser() {
    loginBtn.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.name;
    loginBtn.classList.remove('btn-outline');
    loginBtn.classList.add('btn-primary');
    
    userName.textContent = currentUser.name;
    userEmail.textContent = currentUser.email;
    
    // Mostrar página inicial por padrão
    showPage('home');
}

// Atualizar UI para usuário não logado
function updateUIForLoggedOutUser() {
    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
    loginBtn.classList.remove('btn-primary');
    loginBtn.classList.add('btn-outline');
    
    // Se tentar acessar páginas protegidas, redirecionar para home
    if (currentPage !== 'home') {
        showPage('home');
    }
}

// Configurar eventos
function setupEventListeners() {
    // Navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            
            // Verificar se o usuário está logado para acessar páginas protegidas
            if ((page === 'pdv' || page === 'user-info') && !currentUser) {
                authModal.classList.add('active');
                return;
            }
            
            showPage(page);
        });
    });

    // Botão de login
    loginBtn.addEventListener('click', function() {
        if (currentUser) {
            showPage('user-info');
        } else {
            authModal.classList.add('active');
        }
    });

    // Botão de logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        currentUser = null;
        updateUIForLoggedOutUser();
        showPage('home');
    });

    // Fechar modais
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            authModal.classList.remove('active');
            productsModal.classList.remove('active');
        });
    });

    // Alternar entre abas no modal de autenticação
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
            
            // Atualizar título do modal
            document.getElementById('modal-title').textContent = 
                tabId === 'login' ? 'Entrar na Conta' : 'Criar Nova Conta';
        });
    });

    // Submeter formulário de login
    loginSubmit.addEventListener('click', function() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (email && password) {
            // Simular autenticação
            currentUser = {
                name: "Usuário Demo",
                email: email,
                memberSince: "Jan 2023"
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUIForLoggedInUser();
            authModal.classList.remove('active');
            
            // Limpar campos
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Submeter formulário de registro
    registerSubmit.addEventListener('click', function() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        
        if (name && email && password && confirm) {
            if (password !== confirm) {
                alert('As senhas não coincidem.');
                return;
            }
            
            // Simular registro
            currentUser = {
                name: name,
                email: email,
                memberSince: new Date().toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUIForLoggedInUser();
            authModal.classList.remove('active');
            
            // Limpar campos
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-confirm').value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Abrir modal de produtos
    openProductsModal.addEventListener('click', function() {
        productsModal.classList.add('active');
        loadModalProducts();
    });

    // Adicionar produto ao carrinho pelo código
    addProductBtn.addEventListener('click', function() {
        addProductByCode();
    });

    // Permitir adicionar produto pressionando Enter no campo de código
    productCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addProductByCode();
        }
    });

    // Selecionar método de pagamento
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Confirmar venda
    confirmSaleBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Adicione pelo menos um produto para confirmar a venda.');
            return;
        }
        
        const paymentMethod = document.querySelector('.payment-option.active').getAttribute('data-method');
        alert(`Venda confirmada! Método de pagamento: ${paymentMethod}. Total: ${totalEl.textContent}`);
        
        // Limpar carrinho após venda
        cart = [];
        updateCart();
        
        // Limpar campos
        productCodeInput.value = '';
        document.getElementById('coupon').value = '';
        document.getElementById('customer-cpf').value = '';
    });

    // Alternar entre abas no modal de produtos
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            modalTabs.forEach(t => t.classList.remove('active'));
            modalTabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });

    // Adicionar novo produto ao catálogo
    addNewProductBtn.addEventListener('click', function() {
        addNewProduct();
    });

    // Buscar produtos no modal
    modalSearchBtn.addEventListener('click', function() {
        searchProducts();
    });

    modalSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

// Mostrar página específica
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });
    
    currentPage = pageId;
    
    // Atualizar navegação ativa
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.style.fontWeight = 'bold';
        } else {
            link.style.fontWeight = 'normal';
        }
    });
}

// Carregar produtos no modal
function loadModalProducts(searchTerm = '') {
    modalProductsBody.innerHTML = '';
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredProducts.length === 0) {
        modalProductsBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--gray);">Nenhum produto encontrado</td></tr>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-primary add-from-modal" data-code="${product.code}">
                    <i class="fas fa-plus"></i> Adicionar
                </button>
            </td>
        `;
        
        modalProductsBody.appendChild(row);
    });
    
    // Adicionar eventos aos botões de adicionar
    document.querySelectorAll('.add-from-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            productCodeInput.value = code;
            addProductByCode();
            productsModal.classList.remove('active');
        });
    });
}

// Buscar produtos
function searchProducts() {
    const searchTerm = modalSearchInput.value.trim();
    loadModalProducts(searchTerm);
}

// Adicionar novo produto ao catálogo
function addNewProduct() {
    const code = document.getElementById('new-product-code').value.trim();
    const name = document.getElementById('new-product-name').value.trim();
    const price = parseFloat(document.getElementById('new-product-price').value);
    
    if (!code || !name || isNaN(price) || price <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }
    
    // Verificar se o código já existe
    if (products.some(product => product.code === code)) {
        alert('Já existe um produto com este código.');
        return;
    }
    
    // Adicionar novo produto
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        code: code,
        name: name,
        price: price
    };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Limpar campos
    document.getElementById('new-product-code').value = '';
    document.getElementById('new-product-name').value = '';
    document.getElementById('new-product-price').value = '';
    
    // Recarregar lista de produtos
    loadModalProducts();
    
    alert('Produto adicionado com sucesso!');
}

// Adicionar produto ao carrinho pelo código
function addProductByCode() {
    const code = productCodeInput.value.trim();
    
    if (!code) {
        alert('Por favor, digite um código de produto.');
        return;
    }
    
    // Buscar produto pelo código
    const product = products.find(p => p.code === code);
    
    if (!product) {
        alert('Produto não encontrado. Verifique o código ou adicione o produto ao catálogo.');
        return;
    }
    
    // Verificar se o produto já está no carrinho
    const existingIndex = cart.findIndex(item => item.code === code);
    
    if (existingIndex !== -1) {
        // Se já existe, apenas atualiza a quantidade
        cart[existingIndex].quantity += 1;
    } else {
        // Adiciona novo produto
        cart.push({
            id: product.id,
            code: product.code,
            name: product.name,
            quantity: 1,
            price: product.price
        });
    }
    
    updateCart();
    
    // Limpar campo de código
    productCodeInput.value = '';
    productCodeInput.focus();
}

// Atualizar carrinho
function updateCart() {
    productsTableBody.innerHTML = '';
    
    if (cart.length === 0) {
        productsTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--gray);">Nenhum produto adicionado</td></tr>';
        subtotalEl.textContent = 'R$ 0,00';
        discountEl.textContent = 'R$ 0,00';
        totalEl.textContent = 'R$ 0,00';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
            </td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>R$ ${itemTotal.toFixed(2)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn delete-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        productsTableBody.appendChild(row);
    });
    
    // Adicionar eventos aos inputs de quantidade
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const quantity = parseInt(this.value) || 1;
            const item = cart.find(item => item.id === id);
            
            if (item && quantity > 0) {
                item.quantity = quantity;
                updateCart();
            }
        });
    });
    
    // Adicionar eventos aos botões de remover
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
    
    // Calcular totais
    const discount = calculateDiscount();
    const total = subtotal - discount;
    
    subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    discountEl.textContent = `R$ ${discount.toFixed(2)}`;
    totalEl.textContent = `R$ ${total.toFixed(2)}`;
}

// Calcular desconto (simulação)
function calculateDiscount() {
    const coupon = document.getElementById('coupon').value;
    let discount = 0;
    
    // Simulação de cupons de desconto
    if (coupon === 'DESC10') {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        discount = subtotal * 0.1; // 10% de desconto
    } else if (coupon === 'DESC20') {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        discount = subtotal * 0.2; // 20% de desconto
    }
    
    return discount;
}

// Event listener para recalcular desconto quando o cupom for alterado
document.getElementById('coupon').addEventListener('input', function() {
    updateCart();
});