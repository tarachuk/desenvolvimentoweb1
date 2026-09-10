CREATE DATABASE laboratorio_avaliacao;
USE laboratorio_avaliacao;

CREATE TABLE computadores(
    id INT  PRIMARY KEY AUTO_INCREMENT,
    patrimonio VARCHAR(50) NOT NULL,
    localizacao VARCHAR(100) NOT NULL,
    responsavel VARCHAR(100),
    situacao VARCHAR(30) NOT NULL
);

SELECT * FROM computadores;
DESCRIBE computadores;