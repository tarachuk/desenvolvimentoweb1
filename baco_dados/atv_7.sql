USE sakila;

SHOW FULL TABLES WHERE Table_type = 'VIEW';

-- ===================================
CREATE VIEW vw_filmes_categorias AS
SELECT 
    f.film_id,
    f.title,
    c.name AS categoria,
    f.release_year,
    f.rating
FROM film f
INNER JOIN film_category fc 
    ON f.film_id = fc.film_id
INNER JOIN category c 
    ON fc.category_id = c.category_id;
    
-- ===================================

SELECT * FROM vw_filmes_categorias;

-- ===================================

CREATE VIEW vw_clientes_enderecos AS
SELECT 
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS cliente,
    a.address,
    ci.city
FROM customer c
INNER JOIN address a 
    ON c.address_id = a.address_id
INNER JOIN city ci 
    ON a.city_id = ci.city_id;

-- =================================

SELECT * FROM vw_filmes_categorias;