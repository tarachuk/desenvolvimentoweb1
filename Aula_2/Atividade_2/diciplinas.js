const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
});

/*const diciplina = "Banco de Dados";
const professor = "Carlos";
const aulas_semanais = 4;*/

//const diciplina = "Banco de Dados";
//const professor = "Carlos";
//const aulas_semanais = 5;

//const diciplina = "Programação";
//const professor = "Fernanda";
//const aulas_semanais = 3;

const insert = 'INSERT INTO diciplinas (professor, diciplina, aulas_semanais) VALUE (?, ?, ?)';

conexao.query(insert, [professor, diciplina, aulas_semanais], function (erro) {

    if (erro) {
        console.log("Erro ao cadastrar!");
        console.log(erro);
    }
    else {
        console.log("Diciplina cadastrado.")
    }

    conexao.end();
});

/*const id = 2;

const deletar = 'DELETE FROM diciplinas WHERE id =?';

conexao.query(deletar, [id], function (erro, resultado) {

    if (erro) {
        console.log("Erro ao deletar");
        console.log(erro);
    } else if (resultado.affectedRows ===0) {
        console.log("Diciplina não emcontrado!");
    } else {
        console.log("Diciplina excluido com sucesso!:)");
    }

    conexao.end();
});*/