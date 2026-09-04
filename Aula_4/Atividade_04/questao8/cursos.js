const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "alura"
});


function cadastrarCursos() {

    const nome = readline.question("Digite o nome do curso: ");
    const cargaHoraria = readline.questionInt("Digite a carga horaria do curso: ");

    const insert = "INSERT INTO cursos (nome, carga_horaria) VALUES (?,?)";

    conexao.query(insert, [nome, cargaHoraria], function (erro) {

        if (erro) {
            console.log("Erro ao cadastra o curso!!");
            console.log(erro);
        } else {
            console.log("Curso cadastrado com sucesso!!!!");
        }

        menu();
    });
}


function excluirCursos() {

    const id = readline.question("Digite o id do curso: ");

    const deletar = "DELETE FROM cursos WHERE id = ?";

    conexao.query(deletar, [id], function (erro,resultado) {

        if (erro) {
            console.log("Erro ao excluir o curso.");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("Curso não encontrado.");
        } else {
            console.log("Curso excluido com sucesso!!!");
        }

        menu();
    });
}


function listarCursos() {

    const sql = "SELECT * FROM cursos";

    conexao.query(sql, function (erro, cursos) {

        if (erro) {
            console.log("Erro ao listar os cursos.");
            console.log(erro);
        } else {
            console.log("\n===== CURSOS =====");
            cursos.forEach(function (cursos) {
                console.log(
                    cursos.id +" - "+
                    cursos.nome +" - "+
                    cursos.cargaHoraria
                );
            });
        }

        menu();
    });
}

function atualizarCursos() {

    const id = readline.question("Digite o ID do curso: ");
    const nome = readline.question("Digite o nome novo do curso: ");
    const carga_horaria = readline.question("Digite o nova carga horaria: ");

    const update = `
    UPDATE cursos
    SET nome = ?, carga_horaria = ?
    WHERE id = ?
    `;
    conexao.query(update, [nome, carga_horaria, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o curso.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Curso não encontrado.");
        } else {
            console.log("Curso atualizado com sucesso!");
        }

        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar cursos");
    console.log("2 - Excluir cursos");
    console.log("3 - Listar cursos");
    console.log("4 - Atualizar cursos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarCursos();

    } else if (opcao === 2) {

        excluirCursos();

    } else if (opcao === 3) {

        listarCursos();

    } else if (opcao === 4) {
        
        atualizarCursos();

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