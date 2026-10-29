CREATE DATABASE byteguara;
USE byteguara;

CREATE TABLE clientes(
	id_cliente INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL UNIQUE,
    e_mail VARCHAR(100) NOT NULL UNIQUE,
    cidade VARCHAR(100)  NOT NULL,
    data_cadastro DATE NOT NULL DEFAULT (CURRENT_DATE)
);

CREATE TABLE produtos(
	id_produtos INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    preco INT NOT NULL CHECK (preco >0),
    estoque INT NOT NULL CHECK (estoque >=0),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE vendas(
	id_vendas INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    data_venda DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_produtos)
    REFERENCES produtos(id_produtos),
    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente)
);

SELECT * FROM clientes;
SELECT * FROM produtos;
SELECT * FROM vendas;

DESCRIBE clientes;
DESCRIBE produtos;
DESCRIBE vendas;

INSERT INTO clientes (nome, e_mail, cidade) 
VALUES ("Vitão", "vitao@vitao");

