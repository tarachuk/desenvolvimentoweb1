const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "empreza"
});

/*const nome = "João";
const cargo = "Vendedor";
const salario = 2500;*/

/*const nome = "Mariana";
const cargo = "Gerente";
const salario = 4500.00;*/

/*const nome = "Lucas";
const cargo = "Atendente";
const salario = 2200;*/

const insert = 'INSERT INTO funcionarios (nome, cargo, salario) VALUE (?, ?, ?)';

conexao.query(insert, [nome, cargo, salario], function (erro) {

    if (erro) {
        console.log("Erro ao cadastrar!");
        console.log(erro);
    }
    else {
        console.log("Funcionario cadastrado.")
    }

    conexao.end();
});

/*const id = 2;

const deletar = 'DELETE FROM funcionarios WHERE id =?';

conexao.query(deletar, [id], function (erro, resultado) {

    if (erro) {
        console.log("Erro ao deletar");
        console.log(erro);
    } else if (resultado.affectedRows ===0) {
        console.log("Funcionario não emcontrado!");
    } else {
        console.log("Funcionario excluido com sucesso!:)");
    }

    conexao.end();
});*/