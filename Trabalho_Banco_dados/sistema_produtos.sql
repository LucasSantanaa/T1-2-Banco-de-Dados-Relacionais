
CREATE DATABASE IF NOT EXISTS sistema_produtos;

USE sistema_produtos;


CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao VARCHAR(255),
    preco FLOAT
);

