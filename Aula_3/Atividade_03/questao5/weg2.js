const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "weg2"
});


function cadastrarCliente() {

    const nome = readline.question("Digite o nome do cliente: ");
    const telefone = readline.question("Digite o telefone do cliente: ");

    const insert = "INSERT INTO clientes (nome, telefone) VALUES (?,?)";

    conexao.query(insert, [nome, telefone], function (erro) {

        if (erro) {
            console.log("Erro ao cadastra o cliente!!");
            console.log(erro);
        } else {
            console.log("Cliente cadastrado com sucesso!!!!");
        }

        menu();
    });
}


function excluirCliente() {

    const id = readline.question("Digite o id do cliente: ");

    const deletar = "DELETE FROM clientes WHERE id = ?";

    conexao.query(deletar, [id], function (erro,resultado) {

        if (erro) {
            console.log("Erro ao excluir o cliente.");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("Cliente não encontrado.");
        } else {
            console.log("Cliente excluido com sucesso!!!");
        }

        menu();
    });
}


function listarCliente() {

    const sql = "SELECT * FROM clientes";

    conexao.query(sql, function (erro, clientes) {

        if (erro) {
            console.log("Erro ao listar os clientes.");
            console.log(erro);
        } else {
            console.log("\n===== CLIENTES =====");
            clientes.forEach(function (clientes) {
                console.log(
                    clientes.id +" - "+
                    clientes.nome +" - "+
                    clientes.telefone
                );
            });
        }

        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar cliente");
    console.log("2 - Excluir cliente");
    console.log("3 - Listar cliente");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarCliente();

    } else if (opcao === 2) {

        excluirCliente();

    } else if (opcao === 3) {

        listarCliente();

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