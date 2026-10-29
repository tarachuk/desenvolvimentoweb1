CREATE DATABASE loja_trigger;
USE loja_trigger;

CREATE TABLE produtos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 preco DECIMAL(10,2) NOT NULL,
 estoque INT NOT NULL
);

CREATE TABLE vendas (
 id INT AUTO_INCREMENT PRIMARY KEY,
 produto_id INT NOT NULL,
 quantidade INT NOT NULL,
 valor_total DECIMAL(10,2),
 data_venda DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auditoria (
 id INT AUTO_INCREMENT PRIMARY KEY,
 preco_new DECIMAL(10,2),
 preco_old DECIMAL(10,2),
 mensagem VARCHAR(255),
 data_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos_excluidos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 produto_id INT,
 nome VARCHAR(100),
 preco DECIMAL(10,2),
 estoque INT,
 data_exclusao DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, preco, estoque)
VALUES
('Mouse', 80.00, 20),
('Teclado', 150.00, 15),
('Monitor', 900.00, 10),
('Notebook', 3500.00, 5),
('Headset', 200.00, 8);

DELIMITER $$

CREATE TRIGGER  trg_nome_maiusculo
 BEFORE INSERT ON produtos
 FOR EACH ROW
 SET NEW.nome = UPPER(NEW.nome);
 END $$
 
 DELIMITER ;

INSERT INTO produtos (nome, preco, estoque)
VALUES ('webcam', 250.00, 10);
SELECT * FROM produtos;

DELIMITER $$

CREATE TRIGGER validar_preco
BEFORE INSERT ON produtos
FOR EACH ROW 
BEGIN
 IF NEW.preco < 0 THEN 
 SIGNAL SQLSTATE '45000'
 SET MESSAGE_TEXT = 'O preço não pode ser negativo';
 END IF;
END $$
 
DELIMITER ;

INSERT INTO produtos (nome, preco, estoque)
VALUES ('Cabo USB', -20.00, 10);

DELIMITER $$ 

CREATE TRIGGER validar_estoque
BEFORE INSERT ON produtos
FOR EACH ROW 
BEGIN
 IF NEW.estoque < 0 THEN 
 SIGNAL SQLSTATE '45000'
 SET MESSAGE_TEXT = 'O estoque não pode ser negativo';
 END IF;
END $$

DELIMITER ;

INSERT INTO produtos (nome, preco, estoque)
VALUES ('Caixa de Som', 300.00, -5);

DELIMITER $$

CREATE TRIGGER alteracao_preco
AFTER UPDATE ON produtos
FOR EACH ROW
BEGIN
 INSERT INTO auditoria 
	(id, mensagem, preco_old, preco_new)
 VALUES
	(NEW.id,'UPDATE', OLD.preco, NEW.preco);
END $$
 
DELIMITER ;

UPDATE produtos
SET preco = 80
WHERE id = 1;

SELECT * FROM auditoria;

DELIMITER $$

CREATE TRIGGER validar_novo_preco
BEFORE UPDATE ON produtos	 
FOR EACH ROW
BEGIN
IF NEW.preco < 0 THEN
 SIGNAL SQLSTATE '45000'
 SET MESSAGE_TEXT = 'O preço não pode ser negativo';
 END IF;
END $$ 

DELIMITER ;

UPDATE produtos
SET preco = -500
WHERE id = 3;

DELIMITER $$

CREATE TRIGGER produto_excluido
AFTER DELETE ON produtos
FOR EACH ROW
BEGIN
	INSERT INTO produtos_excluidos 
		(id, nome, preco, estoque)
	VALUES 
		(OLD.id, OLD.nome, OLD.preco, OLD.estoque);
END$$

DELIMITER ;

INSERT INTO produtos (nome, preco, estoque)
VALUES ('Produto Teste', 10.00, 1);

#Depois descubra o ID e exclua o registro.
DELETE FROM produtos WHERE id = 1;

SELECT * FROM produtos_excluidos;



