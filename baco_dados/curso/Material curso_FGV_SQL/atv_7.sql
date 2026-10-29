USE sakila;
 
-- =========================================
-- VIEW 1 - FILMES E CATEGORIAS
-- =========================================
 
CREATE VIEW vw_filmes_categorias AS
SELECT
    f.film_id,
    f.title AS filme,
    c.name AS categoria
FROM film AS f
INNER JOIN film_category AS fc
    ON f.film_id = fc.film_id
INNER JOIN category AS c
    ON fc.category_id = c.category_id;
 
SELECT * FROM vw_filmes_categorias;
 
-- =========================================
-- VIEW 2 - CLIENTES E ENDERECOS
-- =========================================
 
CREATE VIEW vw_clientes_enderecos AS
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS cliente,
    a.address AS endereco,
    ci.city AS cidade
FROM customer AS c
INNER JOIN address AS a
    ON c.address_id = a.address_id
INNER JOIN city AS ci
    ON a.city_id = ci.city_id;
 
SELECT * FROM vw_clientes_enderecos;
 
-- =========================================
-- VIEW 3 - ALUGUEIS
-- =========================================
 
CREATE VIEW vw_alugueis_clientes AS
SELECT
    r.rental_id,
    CONCAT(c.first_name, ' ', c.last_name) AS cliente,
    f.title AS filme,
    r.rental_date AS data_aluguel,
    r.return_date AS data_devolucao
FROM rental AS r
INNER JOIN customer AS c
    ON r.customer_id = c.customer_id
INNER JOIN inventory AS i
    ON r.inventory_id = i.inventory_id
INNER JOIN film AS f
    ON i.film_id = f.film_id;
 
SELECT * FROM vw_alugueis_clientes;
 
-- =========================================
-- VIEW 4 - PAGAMENTOS
-- =========================================
 
CREATE VIEW vw_pagamentos_clientes AS
SELECT
    p.payment_id,
    CONCAT(c.first_name, ' ', c.last_name) AS cliente,
    p.amount AS valor,
    p.payment_date AS data_pagamento
FROM payment AS p
INNER JOIN customer AS c
    ON p.customer_id = c.customer_id;
 
SELECT * FROM vw_pagamentos_clientes;
 
 
-- =========================================
-- INDEX 1
-- =========================================
 
EXPLAIN
SELECT *
FROM actor
WHERE last_name = 'DAVIS';
 
CREATE INDEX idx_actor_last_names
ON actor(last_name);
 
EXPLAIN
SELECT *
FROM actor
WHERE last_name = 'DAVIS';
 
 
-- =========================================
-- INDEX 2
-- =========================================
 
EXPLAIN
SELECT *
FROM film
WHERE title = 'ACADEMY DINOSAUR';
 
CREATE INDEX idx_film_titles
ON film(title);
 
EXPLAIN
SELECT *
FROM film
WHERE title = 'ACADEMY DINOSAUR';
 
 
-- =========================================
-- INDEX 3
-- =========================================
 
EXPLAIN
SELECT *
FROM payment
WHERE amount = 4.99;
 
CREATE INDEX idx_payment_amount
ON payment(amount);
 
EXPLAIN
SELECT *
FROM payment
WHERE amount = 4.99;
 
 
-- =========================================
-- TABELA DE AUDITORIA
-- =========================================
 
CREATE TABLE auditoria_pagamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id SMALLINT UNSIGNED,
    valor_antigo DECIMAL(5,2),
    valor_novo DECIMAL(5,2),
    acao VARCHAR(20),
    data_acao DATETIME DEFAULT CURRENT_TIMESTAMP
);
 
 
-- =========================================
-- TRIGGER 1 - UPDATE
-- =========================================
 
DELIMITER //
 
CREATE TRIGGER trg_pagamento_update
AFTER UPDATE ON payment
FOR EACH ROW
BEGIN
 
    INSERT INTO auditoria_pagamento
        (payment_id, valor_antigo, valor_novo, acao)
    VALUES
        (OLD.payment_id, OLD.amount, NEW.amount, 'UPDATE');
 
END//
 
DELIMITER ;
 
-- TESTE
 
UPDATE payment
SET amount = amount + 1
WHERE payment_id = 1;
 
SELECT *
FROM auditoria_pagamento;
 
-- =========================================
-- TRIGGER 2 - DELETE
-- =========================================
 
DELIMITER //
 
CREATE TRIGGER trg_pagamento_delete
BEFORE DELETE ON payment
FOR EACH ROW
BEGIN
 
    INSERT INTO auditoria_pagamento
        (payment_id, valor_antigo, valor_novo, acao)
    VALUES
        (OLD.payment_id, OLD.amount, NULL, 'DELETE');
 
END//
 
DELIMITER ;
 
-- TESTE SEGURO DA TRIGGER
 
START TRANSACTION;
 
DELETE FROM payment
WHERE payment_id = 1;
 
SELECT *
FROM auditoria_pagamento
WHERE payment_id = 1;
 
ROLLBACK;

