CREATE DATABASE prefeitura;
USE prefeitura;

CREATE TABLE eventos ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(100), 
    data_evento DATE 
    );

SELECT * FROM eventos;