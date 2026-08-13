const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca"
});

//const titulo = "Jesus de Nazare";
//const autor = "Joseph Aloisius Ratzinger";

/*const insert = 'INSERT INTO livros (titulo, autor) VALUE (?, ?)';

conexao.query(insert, [titulo, autor], function (erro) {

    if (erro) {
        console.log("Erro ao cadastrar!!");
        console.log(erro);
    }
    else {
        console.log("Cadastro com sucesso");
    }

   conexao.end();
});*/

const id = 2

const deletar = 'DELETE FROM livros WHERE id =?';

conexao.query(deletar, [id], function (erro, resultado) {

    if (erro) {
        console.log("Erro ao excluir o produto.");
        console.log(erro);
    }
    else if (resultado.affectedRows === 0) {
        console.log("Livro não encontrado");
    } else {
        console.log("Livro excluido com sucesso!");
    }

    conexao.end();
});