const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "prefeitura"
});

function cadastrarEventos() {

    const nome = readline.question("Digite o nome do evento: ");
    const data_evento = readline.question("Digite a data do evento(AAAA-MM-DD): ");

    const insert = "INSERT INTO eventos (nome,data_evento) VALUES (?,?)";

    conexao.query(insert, [nome, data_evento], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar evento!");
            console.log(erro);
        } else {
            console.log("Evento cadastrado com sucesso.");
        }
    
    menu();
    });
}

function listarEventos() {

    const sql = "SELECT * FROM eventos ORDER BY data_evento ASC";

    conexao.query(sql, function (erro,eventos) {

        if (erro){
            console.log("Erro ao listar eventos!");
            console.log(erro);
        } else {
            console.log("\n===== EVENTOS ===== \n");
            eventos.forEach(function (eventos) {
                console.log(
                    eventos.id+" - "+
                    eventos.nome+" - "+
                    eventos.data_evento
                );
            });
        }

    menu();
    });
}

function excluirEventos() {

    const id = readline.question("Deigite o ID do evento: ");

    const deletar = "DELETE FROM eventos WHERE id = ?";

    conexao.query(deletar, [id], function (erro,resultado) {

        if (erro) {
            console.log("Erro ao excluir evento!");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("Evento não encontrado!");
        } else {
            console.log("Evento exluido com sucesso.");
        }

        menu();
    });
}

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar eventos");
    console.log("2 - Listar eventos");
    console.log("3 - Excluir eventos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao ===1){
        
        cadastrarEventos();

    } else if (opcao ===2) {

        listarEventos();

    } else if (opcao ===3) {

        excluirEventos();

    } else if (opcao ===0) {

        console.log("Programa encerrado");
        conexao.end();
    } else {

        console.log("\nOpção invalida");
        menu();
    }
}
menu();