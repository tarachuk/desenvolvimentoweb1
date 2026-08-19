CREATE DATABASE empreza;
USE empreza;

CREATE TABLE funcionarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)NOT NULL,
    cargo VARCHAR(100)NOT NULL,
    salario DECIMAL(10,3)NOT NULL
);

SELECT * FROM funcionarios;