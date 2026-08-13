const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});

//const nome = "Maria";
//const diciplina = "Matemática";

//const nome = "Carlos";
//const diciplina = "Banco de Dados";

//const nome = "Fernanda";
//const diciplina = "Programação";

/*const insert = 'INSERT INTO professores (nome, diciplina) VALUE (?, ?)';

conexao.query(insert, [nome, diciplina], function (erro) {

    if (erro) {
        console.log("Erro ao cadastrar!");
        console.log(erro);
    }
    else {
        console.log("Professor cadastrado.")
    }

    conexao.end();
});*/

const id = 2;

const deletar = 'DELETE FROM professores WHERE id =?';

conexao.query(deletar, [id], function (erro, resultado) {

    if (erro) {
        console.log("Erro ao deletar");
        console.log(erro);
    } else if (resultado.affectedRows ===0) {
        console.log("Professor não emcontrado!");
    } else {
        console.log("Professor excluido com sucesso!:)");
    }

    conexao.end();
});