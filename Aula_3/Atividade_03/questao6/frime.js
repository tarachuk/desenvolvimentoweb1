const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "firmes"
});


function cadastrarFilmes() {

    const titulo = readline.question("Digite o nome do filme: ");
    const ano = readline.question("Digite o telefone do filme: ");

    const insert = "INSERT INTO filmes (titulo, ano) VALUES (?,?)";

    conexao.query(insert, [titulo, ano], function (erro) {

        if (erro) {
            console.log("Erro ao cadastra o filme!!");
            console.log(erro);
        } else {
            console.log("Filme cadastrado com sucesso!!!!");
        }

        menu();
    });
}


function excluirFilmes() {

    const id = readline.question("Digite o id do filme: ");

    const deletar = "DELETE FROM filme WHERE id = ?";

    conexao.query(deletar, [id], function (erro,resultado) {

        if (erro) {
            console.log("Erro ao excluir o filme.");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("Filme não encontrado.");
        } else {
            console.log("Filme excluido com sucesso!!!");
        }

        menu();
    });
}


function listarFilmes() {

    const sql = "SELECT * FROM filmes";

    conexao.query(sql, function (erro, filmes) {

        if (erro) {
            console.log("Erro ao listar os filme.");
            console.log(erro);
        } else {
            console("\n===== FILMES =====");
            filmes.forEach(function (filmes) {
                console.log(
                    filmes.id +" - "+
                    filmes.titulo +" - "+
                    filmes.ano
                );
            });
        }

        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar filmes");
    console.log("2 - Excluir filmes");
    console.log("3 - Listar filmes");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarFilmes();

    } else if (opcao === 2) {

        excluirFilmes();

    } else if (opcao === 3) {

        listarFilmes();

    } else if (opcao === 0) {

        console.log("Programa encerrado.");
        conexao.end();

    } else {

        console.log("Opção invalida.");
        menu();

    }
}

// Inicia o progama
menu();