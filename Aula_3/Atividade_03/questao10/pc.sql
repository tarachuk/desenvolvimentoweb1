CREATE DATABASE pc;
USE pc;

CREATE TABLE computadores ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    patrimonio VARCHAR(50), 
    localizacao VARCHAR(100) 
    );

SELECT * FROM computadores;