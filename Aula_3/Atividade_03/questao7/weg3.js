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
    const cargo = readline.question("Digite o cargo do funcionarios: ");

    const insert = "INSERT INTO funcionarios (nome,cargo) VALUES (?,?)";

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

    const confirmar = readline.question("Deseja realmente excluir este funcionário? (S/N):");

    if (confirmar.toUpperCase()==="S") {

        const deletar = "DELETE FROM funcionarios WHERE id = ?";

        conexao.query(deletar, [id], function (erro,resultado) {

            if (erro) {
                console.log("Erro ao excluir o funcionarios.");
                console.log(erro);
            } else if (resultado.affectedRows ===0) {
                console.log("Funcionarios não encontrado.");
            } else {
                console.log("Funcionarios excluido com sucesso!!!");
            }

        });
    } else {
        console.log("Funcionario não excluido!")
    }
    menu();
}


function listarFuncionarios() {

    const sql = "SELECT * FROM funcionarios";

    conexao.query(sql, function (erro, funcionarios) {

        if (erro) {
            console.log("Erro ao listar os funcionarios.");
            console.log(erro);
        } else {
            console.log("\n===== FUNCIONARIOS =====");
            funcionarios.forEach(function (funcionarios) {
                console.log(
                    funcionarios.id +" - "+
                    funcionarios.nome +" - "+
                    funcionarios.cargo
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
    console.log("3 - Listar funcionarios");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarFuncionarios();

    } else if (opcao === 2) {

        excluirFuncionarios();

    } else if (opcao === 3) {

        listarFuncionarios();

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