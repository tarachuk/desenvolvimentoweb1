CREATE DATABASE escola_joins;
USE escola_joins;

CREATE TABLE cursos (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    nome_curso VARCHAR(100) NOT NULL
);

CREATE TABLE alunos (
    id_aluno INT PRIMARY KEY AUTO_INCREMENT,
    nome_aluno VARCHAR(100) NOT NULL,
    idade INT,
    cidade VARCHAR(100),
    id_curso INT,
    
    FOREIGN KEY (id_curso)
    REFERENCES cursos(id_curso)
);

INSERT INTO cursos (nome_curso)
VALUES
('Desenvolvimento de Sistemas'),
('Administração'),
('Enfermagem'),
('Logística'),
('Recursos Humanos'),
('Informática'),
('Marketing'),
('Segurança do Trabalho');


INSERT INTO alunos 
(nome_aluno, idade, cidade, id_curso)
VALUES
('Ana Souza', 17, 'Guaramirim', 1),
('Bruno Silva', 18, 'Jaraguá do Sul', 1),
('Carla Mendes', 17, 'Guaramirim', 2),
('Daniel Oliveira', 19, 'Jaraguá do Sul', 2),
('Eduarda Santos', 18, 'Schroeder', 3),
('Felipe Costa', 20, 'Guaramirim', 3),
('Gabriela Lima', 17, 'Jaraguá do Sul', NULL),
('Henrique Martins', 18, 'Guaramirim', 4),
('Isabela Rocha', 19, 'Schroeder', 4),
('João Pereira', 18, 'Jaraguá do Sul', 5),
('Karen Almeida', 17, 'Guaramirim', 5),
('Lucas Ferreira', 20, 'Jaraguá do Sul', 6),
('Mariana Alves', 18, 'Schroeder', 6),
('Nicolas Ribeiro', 19, 'Guaramirim', NULL),
('Olivia Gomes', 17, 'Jaraguá do Sul', 1),
('Pedro Carvalho', 18, 'Guaramirim', 1),
('Rafaela Dias', 19, 'Schroeder', 2),
('Samuel Cardoso', 18, 'Jaraguá do Sul', 2),
('Talita Freitas', 20, 'Guaramirim', 3),
('Vinicius Moraes', 17, 'Jaraguá do Sul', 3),
('Amanda Nunes', 18, 'Schroeder', NULL),
('Bernardo Castro', 19, 'Guaramirim', 4),
('Camila Teixeira', 17, 'Jaraguá do Sul', 4),
('Diego Correia', 18, 'Guaramirim', 5),
('Elisa Barbosa', 19, 'Schroeder', 5),
('Fernando Lopes', 20, 'Jaraguá do Sul', 6),
('Giovana Ramos', 18, 'Guaramirim', 6),
('Heitor Vieira', 17, 'Jaraguá do Sul', NULL),
('Ingrid Fernandes', 19, 'Schroeder', 1),
('José Almeida', 18, 'Guaramirim', 1),
('Larissa Pinto', 17, 'Jaraguá do Sul', 2),
('Mateus Rodrigues', 20, 'Guaramirim', 2),
('Natalia Martins', 18, 'Schroeder', 3),
('Otavio Souza', 19, 'Jaraguá do Sul', 3),
('Paula Ribeiro', 17, 'Guaramirim', NULL),
('Renato Gomes', 18, 'Jaraguá do Sul', 4),
('Sabrina Costa', 19, 'Schroeder', 5),
('Thiago Lima', 18, 'Guaramirim', 6),
('Vanessa Rocha', 20, 'Jaraguá do Sul', 1),
('William Santos', 18, 'Guaramirim', NULL);

SELECT * FROM alunos;
SELECT * FROM cursos;

-- ===========================================
-- INNER JOIN
-- ===========================================

SELECT
	a.nome_aluno,
	c.nome_curso
FROM alunos a
INNER JOIN cursos c
ON a.id_curso = c.id_curso;

-- ===========================================
-- LEFT JOIN
-- ===========================================

SELECT
	a.nome_aluno,
	c.nome_curso
FROM alunos a
LEFT JOIN cursos c
ON a.id_curso = c.id_curso;

-- ===========================================
-- RIGHT JOIN
-- ===========================================

SELECT
 a.nome_aluno,
 c.nome_curso
FROM alunos a
RIGHT JOIN cursos c
ON a.id_curso = c.id_curso;

-- ===========================================
-- CROSS JOIN
-- ===========================================

SELECT
 a.nome_aluno,
 c.nome_curso
FROM alunos a
CROSS JOIN cursos c;

-- ===========================================
-- SELF JOIN
-- ===========================================


CREATE TABLE funcionarios (
 id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
 nome_funcionario VARCHAR(100) NOT NULL,
 id_supervisor INT
);

INSERT INTO funcionarios (nome_funcionario, id_supervisor)
VALUES
('Carlos', NULL),
('Fernanda', 1),
('Gustavo', 1),
('Helena', 2);

SELECT * FROM funcionarios;

SELECT
 f.nome_funcionario AS funcionario,
 s.nome_funcionario AS supervisor
FROM funcionarios f
LEFT JOIN funcionarios s
ON f.id_supervisor = s.id_funcionario;




