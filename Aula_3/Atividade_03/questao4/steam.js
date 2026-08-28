const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "steam"
});

// Funcao cadastrar jogos
function cadastrarJogos() {

    const nome = readline.question("Digite o nome do jogo: ");
    const genero = readline.question("Digite genero do jogo: ");

    const insert = "INSERT INTO jogos (nome, genero) VALUES (?,?)";

    conexao.query(insert, [nome, genero], function (erro) {

        if (erro) {
            console.log("Erro ao cadastra jogo!!");
            console.log(erro);
        } else {
            console.log("Jogo cadastrado com sucesso!!!!");
        }

        menu();
    });
}

// Funcao para excluir os jogos
function excluirJogos() {

    const id = readline.question("Digite o id do jogo: ");

    const deletar = "DELETE FROM jogos WHERE id = ?";

    conexao.query(deletar, [id], function (erro,resultado) {

        if (erro) {
            console.log("Erro ao excluir o jogo.");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("Jogo não encontrado.");
        } else {
            console.log("Jogo excluido com sucesso!!!");
        }

        menu();
    });
}

// Funcao listar jogos
function listarJogos() {

    const sql = "SELECT * FROM jogos";

    conexao.query(sql, function (erro, jogos) {

        if (erro) {
            console.log("Erro ao listar os jogos.");
            console.log(erro);
        } else {
            console.log("\n===== JOGOS =====");
            jogos.forEach(function (jogos) {
                console.log(
                    jogos.id +" - "+
                    jogos.nome +" - "+
                    jogos.genero
                );
            });
        }

        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== BIBLIOTECA =====");
    console.log("1 - Cadastrar jogos");
    console.log("2 - Excluir jogos");
    console.log("3 - Listar jogos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarJogos();

    } else if (opcao === 2) {

        excluirJogos();

    } else if (opcao === 3) {

        listarJogos();

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