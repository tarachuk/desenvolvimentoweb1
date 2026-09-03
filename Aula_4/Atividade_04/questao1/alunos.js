const mysql = require("mysql2");
const readline = require("readline-sync");

//Conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola2"
});

// Função para cadastrar o aluno
function cadastrarAluno() {

    const nome = readline.question("Digite o nome do aluno: ");
    const email = readline.question("Digite o email do aluno: ");
    const endereco = readline.question("Digite o endereco do aluno: ");
    const matricula = readline.question("Digite a matricula do aluno: ");
    const curso = readline.question("Digite o curso do aluno: ");
    const Serie = readline.question("Digite a serie do aluno: ");

    const insert = "INSERT INTO alunos (nome, email, endereco, matricula, curso, Serie) VALUES (?,?,?,?,?,?)";

    conexao.query(insert, [nome, email, endereco, matricula, curso, Serie], function (erro) {

        if (erro) {
            console.log("Erro ao cadastrar.");
            console.log(erro);
        } else {
            console.log("Aluno cadastrado com sucesso!");
        };

        menu();
    });
}


//Função para excluir aluno
function excluirAluno() {

    const id = readline.questionInt("Digite o ID do aluno: ");

    const deletar = "DELETE FROM alunos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao excluir o aluno :/");
            console.log(erro);
        } else if (resultado.affectedRows ===0) {
            console.log("Aluno não encontrado");
        } else {
            console.log("Aluno excluido com sucesso!");
        }

    menu();
    });
};

function listarAlunos() {

    const sql = "SELECT * FROM alunos";

    conexao.query(sql, function (erro, aluno) {

        if (erro) {
            console.log("Erro ao buscar alunos!");
        } else {
            console.log("\n--- ALUNOS ---");
            aluno.forEach(function (aluno) {

                console.log(
                    aluno.id +" - "+
                    aluno.nome +" - "+
                    aluno.email +" - "+
                    aluno.endereco +" - "+
                    aluno.matricula +" - "+
                    aluno.curso +" - "+
                    aluno.Serie
                );
            });
        }
        
        menu();
    });
}

//Funcao UpDate
function updateAluno() {

    const id = readline.question("Digite o ID do aluno: ");
    const nome = readline.question("Nome novo do aluno: ");
    const email = readline.question("E-mail novo do aluno: ");

    const update = `
        UPDATE alunos
        SET nome = ?, email = ?
        WHERE id = ?
        `;
    conexao.query(update, [nome, email, id], function (erro, resultado) {
 
        if (erro) {
            console.log("Erro ao atualizar o aluno.");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Aluno não encontrado.");
        } else {
            console.log("Aluno atualizado com sucesso!");
        }
 
        menu();
});
}

// Menu principal

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar aluno");
    console.log("2 - Excluir aluno");
    console.log("3 - Listar alunos");
    console.log("4 - Atualizar aluno");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarAluno();

    } else if (opcao === 2) {

        excluirAluno();

    } else if (opcao === 3) {

        listarAlunos();

    } else if (opcao === 4) {

        updateAluno();

    }else if (opcao === 0) {

        console.log("Programa encerrado.");
        conexao.end();

    } else {

        console.log("Opção invalida.");
        menu();

    }
}

// Inicia o progama
menu();