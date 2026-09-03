CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    titulo VARCHAR(150),
    autor VARCHAR(100) 
    );

SELECT * FROM livros;