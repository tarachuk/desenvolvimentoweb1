const mysql = require("mysql2");

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});

Dados que seram cadastrados
const nome= "João"
const email= "joap@email.com";

// Comando SQL 
const insert = "INSERT INTO alunos (nome, email) VALUE (?, ?)";

// Envia os dados para o MySQL
conexao.query(insert, [nome, email], function(erro) {

    if (erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    }
    else {
        console.log("Aluno cadastrado com sucesso!");
    }


});

// ID do aluno que será excluido
const id = 9;

const deletar = "DELETE FROM alunos WHERE id = ?";

conexao.query(deletar, [id], function (erro, resultado) {

    if (erro) {
        console.log("Erro ao excluir o aluno.");
        console.log(erro);
    }else if (resultado.affectedRows === 0) {
        console.log("Aluno não encontrado.");
    } else {
        console.log("Aluno excluído com sucesso!");
    }

    conexao.end();
});