CREATE DATABASE alura;
USE alura;

CREATE TABLE cursos ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(100), 
    carga_horaria INT 
    );

SELECT * FROM cursos;