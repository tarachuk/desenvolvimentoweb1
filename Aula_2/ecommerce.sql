CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE produtos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)NOT NULL,
    preco DECIMAL(10,2)NOT NULL
    );
    
SELECT * FROM produtos;
    