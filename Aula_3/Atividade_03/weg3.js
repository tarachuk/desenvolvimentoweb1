const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "weg3"
});


function cadastrarFuncionarios() {

    const nome = readline.question("Digite o nome do funcionario: ");
    const cargo = readline.question("Digite o telefone do funcionarios: ");

    const insert = "INSERT INTO funcionarios (nome, telefone) VELUES (?,?)";

    conexao.query(insert, [nome, cargo], function (erro) {

        if (erro) {
            console.log("Erro ao cadastra o funcionario!!");
            console.log(erro);
        } else {
            console.log("Funcionario cadastrado com sucesso!!!!");
        }

        menu();
    });
}


function excluirFuncionarios() {

    const id = readline.question("Digite o id do funcionarios: ");

    const deletar = "DELETE FROM funcionarios WHERE id = ?";

    conexao.query(deletar, [id], function (erro,resultado) {

        if (erro) {
            console.log("Erro ao excluir o funcionarios.");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("funcionarios não encontrado.");
        } else {
            console.log("funcionarios excluido com sucesso!!!");
        }

        menu();
    });
}


function listarCliente() {

    const sql = "SELECT * FROM funcionarios";

    conexao.query(sql, function (erro, clientes) {

        if (erro) {
            console.log("Erro ao listar os funcionarios.");
            console.log(erro);
        } else {
            console("\n===== CLIENTES =====");
            funcionarios.forEach(function (funcionarios) {
                console.log(
                    funcionarios.id +" - "+
                    funcionarios.nome +" - "+
                    funcionarios.telefone
                );
            });
        }

        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar funcionarios");
    console.log("2 - Excluir funcionarios");
    console.log("funcionarios");
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