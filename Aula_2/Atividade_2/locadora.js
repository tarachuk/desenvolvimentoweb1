const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "locadora"
});

//const tutulo = "Interestelar";
//const ano = "2014";

//const titulo = "Avatar";
//const ano = "2009";

const titulo = "Toy Story";
const ano = "1995";

const insert = 'INSERT INTO filmes (titulo, ano) VALUE (?, ?)';

conexao.query(insert, [titulo, ano], function (erro) {

    if (erro) {
        console.log("Erro ao cadastrar!");
        console.log(erro);
    }
    else {
        console.log("Filme cadastrado.")
    }

    conexao.end();
});

const id = 2;

const deletar = 'DELETE FROM filmes WHERE id =?';

conexao.query(deletar, [id], function (erro, resultado) {

    if (erro) {
        console.log("Erro ao deletar");
        console.log(erro);
    } else if (resultado.affectedRows ===0) {
        console.log("Filme não emcontrado!");
    } else {
        console.log("Filme excluido com sucesso!:)");
    }

    conexao.end();
});