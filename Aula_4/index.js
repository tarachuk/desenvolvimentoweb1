const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});

function inserirAluno(){

const nome = readline.question("Digite o nome do aluno: ");
const email = readline.question("Digite o email do aluno: ");

const insert = "INSERT INTO alunos (nome, email) VAULES (?,?)";

    conexao.query(insert, [nome, email], function(erro) {

        if (erro) {
            console.log("Erro ao cadastrar o aluno!");
            console.log(erro);
        } else {
            console.log("Aluno cadastrado com sucesso!!");
        }

        menu();
    });
}

function updateAluno() {

const id = readline.question("Digite o id para atualização: ");

const update = `
    UPDATE alunos
    SET nome = ?, email = ?
    WHERE id = ?
`;

conexao.query(update,[nome, email], function (erro,resultado) {

    if (erro) {
        console.log("Erro ao atualizar!!");
        console.log(erro);
    } else if (resultado.affectedRows ===0) {
        console.log("Aluno não encontraso")
    } else {
        console.log("Aluno atualizado com sucesso")
    }

    menu();
});
}