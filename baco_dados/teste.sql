CREATE DATABASE teste;
USE teste;

CREATE TABLE clientes (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE
);

CREATE TABLE clientes_backup (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE,
data_exclusao TIMESTAMP DEFAULT
CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER after_cliente_delete
AFTER DELETE ON clientes
FOR EACH ROW
BEGIN INSERT INTO clientes_backup
(nome, email)
VALUES (OLD.nome, OLD.email);
END; //
DELIMITER ;

INSERT INTO clientes (nome, email) VALUES
('João Silva', 'joao.silva@email.com'),
('Maria Souza', 'maria.souza@email.com'),
('Pedro Oliveira', 'pedro.oliveira@email.com');

DELETE FROM clientes WHERE id = 2;

SELECT * FROM clientes;

SELECT * FROM clientes_backup;