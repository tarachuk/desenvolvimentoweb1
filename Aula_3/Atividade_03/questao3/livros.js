const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca"
});

// Funcao cadastra livros
function cadastrarLivros() {

    const titulo = readline.question("Digite o titulo do livro: ");
    const autor = readline.question("Digite o nome do autor do livro: ");

    const insert = "INSERT INTO livros (titulo, autor) VALUES (?,?)";

    conexao.query(insert, [titulo, autor], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar livro!!");
            console.log(erro);
        } else {
            console.log("Livro cadastrado com sucesso.");
        }

        menu();
    });
}

// Funcao de exclucao do livro
function excluirLivro() {

    const id = readline.question("Digite o id do livro: ");

    const deletar = "DELETE FROM livros WHERE id = ?";

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir livro!!");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("Livro não encontrado!");
        } else {
            console.log("Livro excluido com sucesso.");
        }

        menu();
    });
}

// Funcao listar livro
function listarLivro() {

    const sql = "SELECT * FROM livros";

    conexao.query(sql, function (erro, livros) {

        if (erro) {
            console.log("Erro ao listar os livros!");
            console.log(erro);
        } else {
            console.log("\n===== BIBLIOTECA =====");
            livros.forEach(function(livros){
                console.log(
                    livros.id +" - "+
                    livros.titulo +" - "+
                    livros.autor
                );
            });
        }

        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar livro");
    console.log("2 - Excluir livro");
    console.log("3 - Listar livros");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarLivros();

    } else if (opcao === 2) {

        excluirLivro();

    } else if (opcao === 3) {

        listarLivro();

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