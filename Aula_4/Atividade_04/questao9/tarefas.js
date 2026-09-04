const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "deveres"
});

function cadastrarTarefas() {

    const descricao = readline.question("Digite a descrição da tarefa: ");
    if (descricao ===""){
        const responsavel = readline.question("Digite nome do responsavel: ");

        const insert = "INSERT INTO tarefas (descricao, responsavel)VALUES (?,?)";

        conexao.query(insert, [descricao, responsavel], function (erro) {

            if (erro) {
                console.log("Erro ao cadastra o tarefa!!");
                console.log(erro);
            } else {
                console.log("Tarefa cadastrado com sucesso!!!!");
            }

        });
    } else {
        console.log("\n Descrição invalida!!!");
    }
    menu();
}


function excluirTarefas() {

    const id = readline.question("Digite o id do tarefa: ");

    const deletar = "DELETE FROM tarefas WHERE id = ?";

    conexao.query(deletar, [id], function (erro,resultado) {

        if (erro) {
            console.log("Erro ao excluir o tarefa.");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("Tarefa não encontrado.");
        } else {
            console.log("Tarefa excluido com sucesso!!!");
        }

        menu();
    });
}


function listarTarefas() {

    const sql = "SELECT * FROM tarefas";

    conexao.query(sql, function (erro, tarefas) {

        if (erro) {
            console.log("Erro ao listar os tarefas.");
            console.log(erro);
        } else {
            console.log("\n===== TAREFAS =====");
            tarefas.forEach(function (tarefas) {
                console.log(
                    tarefas.id +" - "+
                    tarefas.descricao +" - "+
                    tarefas.responsavel
                );
            });
        }

        menu();
    });
}

function atualizarTarefas() {

    const id = readline.question("Digite o ID do tarefa: ");
    const descricao = readline.question("Digite o nome novo do tarefa: ");
    const responsavel = readline.question("Digite o novo tarefa: ");

    const update = `
    UPDATE tarefas
    SET descricao = ?, responsavel = ?
    WHERE id = ?
    `;
    conexao.query(update, [descricao, responsavel, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o tarefas.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Tarefa não encontrado.");
        } else {
            console.log("Tarefa atualizado com sucesso!");
        }

        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar tarefas");
    console.log("2 - Excluir tarefas");
    console.log("3 - Listar tarefas");
    console.log("4 - Atualizar tarefa");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarTarefas();

    } else if (opcao === 2) {

        excluirTarefas();

    } else if (opcao === 3) {

        listarTarefas();

    } else if (opcao === 4) {

        atualizarTarefas();

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