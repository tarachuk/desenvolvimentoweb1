CREATE DATABASE deveres;
USE deveres;

CREATE TABLE tarefas ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    descricao VARCHAR(200) NOT NULL, 
    responsavel VARCHAR(100) 
    );

SELECT * FROM tarefas;