const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cedup"
});

//const nome = "Desenvolvimento de Sistemas";
//const carga_horaria = "1200 horas";

//const nome = "Informática";
//const carga_horaria = "1000 horas";

/*const nome = "Administração";
 const carga_horaria = "800 horas";

const insert = 'INSERT INTO cursos (nome, carga_horaria) VALUE (?, ?)';

conexao.query(insert, [nome, carga_horaria], function (erro) {

    if (erro) {
        console.log("Erro ao cadastrar!");
        console.log(erro);
    }
    else {
        console.log("Curso cadastrado.")
    }

    conexao.end();
});*/

const id = 3;

const deletar = 'DELETE FROM cursos WHERE id =?';

conexao.query(deletar, [id], function (erro, resultado) {

    if (erro) {
        console.log("Erro ao deletar");
        console.log(erro);
    } else if (resultado.affectedRows ===0) {
        console.log("Curso não emcontrado!");
    } else {
        console.log("Curso excluido com sucesso!:)");
    }

    conexao.end();
});