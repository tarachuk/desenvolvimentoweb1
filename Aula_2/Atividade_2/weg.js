const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "weg"
});

//const nome = "Ana Souza";
//const telefone = "47999990000";

//const nome = "Pedro Lima";
//const telefone = "47988880000";

/*const nome = "Juliana Costa";
const telefone = "47977770000";

const insert = 'INSERT INTO clientes (nome, telefone) VALUE (?, ?)';

conexao.query(insert, [nome, telefone], function (erro) {

    if (erro) {
        console.log("Erro ao cadastrar!");
        console.log(erro);
    }
    else {
        console.log("Cliente cadastrado.")
    }

    conexao.end();
});*/

const id = 4;

const deletar = 'DELETE FROM clientes WHERE id =?';

conexao.query(deletar, [id], function (erro, resultado) {

    if (erro) {
        console.log("Erro ao deletar");
        console.log(erro);
    } else if (resultado.affectedRows ===0) {
        console.log("Cliente não emcontrado!");
    } else {
        console.log("Cliente excluido com sucesso!:)");
    }

    conexao.end();
});