CREATE DATABASE locadora;
USE locadora;

CREATE TABLE veiculos ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    modelo VARCHAR(100), 
    placa VARCHAR(20) 
    );

SELECT * FROM veiculos;