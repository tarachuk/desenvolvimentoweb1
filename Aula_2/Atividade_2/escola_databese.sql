CREATE DATABASE escola;
USE escola;

CREATE TABLE alunos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)NOT NULL,
    email VARCHAR(150)NOT NULL
    );
    
    SELECT * FROM alunos;
    
CREATE TABLE professores(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)NOT NULL,
    diciplina VARCHAR(100)NOT NULL
);

SELECT * FROM professores;

CREATE TABLE diciplinas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    diciplina VARCHAR(100)NOT NULL,
    professor VARCHAR(100)NOT NULL,
    aulas_semanais DECIMAL(10)NOT NULL
);

SELECT * FROM diciplinas;