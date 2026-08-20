CREATE DATABASE universidade;
USE universidade;

CREATE TABLE alunos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)NOT NULL,
    email VARCHAR(150)NOT NULL
    );
    
    SELECT * FROM alunos;