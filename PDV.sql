create database PDV;
use PDV;

# users (nome, email, senha, vendasrealizadas, faturamento, tempodeuso)
# products (codigo, nome, valor)
# vendas (id, codigoproduct, idusers, valort, idformapag, desconto, cpf)
# Cupons (id, nome, quantidade)
# FAQ (id, simbolo, pergunta, resposta)
# Sistemas (id, nome, disponibilidade)
# Formpag (id, nome, taxa)


CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    valor DECIMAL(10, 2) NOT NULL
);

CREATE TABLE faq (
    id INT PRIMARY KEY AUTO_INCREMENT,
    simbolo VARCHAR(50) NOT NULL,
    pergunta VARCHAR(100) NOT NULL,
    resposta TEXT NOT NULL
);

CREATE TABLE sistemas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    disponibilidade BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE cupons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    desconto INT NOT NULL
);

CREATE TABLE formpag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    simbolo VARCHAR(50) NOT NULL,
    nome VARCHAR(20) NOT NULL,
    taxa DECIMAL(5,2) NOT NULL
);

CREATE TABLE vendas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    formpag_id INT NOT NULL,
    cupom_id INT,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (formpag_id) REFERENCES formpag(id),
    FOREIGN KEY (cupom_id) REFERENCES cupons(id)
);