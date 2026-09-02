const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pc"
});


function cadastrarComputadores() {

    const patrimonio = readline.question("Digite o nome do computador: ");
    const localizacao = readline.question("Digite a localização do computador: ");

    const insert = "INSERT INTO computadores (patrimonio, localizacao) VALUES (?,?)";

    conexao.query(insert, [patrimonio, localizacao], function (erro) {

        if (erro) {
            console.log("Erro ao cadastro do computador!!");
            console.log(erro);
        } else {
            console.log("Computador cadastrado com sucesso!!!!");
        }

        menu();
    });
}


function excluirComputadores() {

    const id = readline.question("Digite o id do computador: ");

    listarComputadorExcluir(id, function (computador) {
        if (computador ===null) {
            menu();
            return;
        }
        console.log(
            "\nPatrimônio: "+computador.patrimonio+
            "\nLocalização: "+computador.localizacao
        );
        
    
        const confirmar = readline.question(
            "\nDeseja realmente excluir este computador? (S/N): ");

        if (confirmar.toUpperCase()==="S") {

            const deletar = "DELETE FROM computadores WHERE id = ?";

            conexao.query(deletar, [id], function (erro,resultado) {

                if (erro) {
                    console.log("Erro ao excluir o computador.");
                    console.log(erro);
                } else if (resultado.affectedRows ===0) {
                    console.log("Computador não encontrado.");
                } else {
                    console.log("Computador excluido com sucesso!!!");
                }

                menu();
            });
        } else {
            console.log("Computador não excluido!")
            menu();
        }  
    });
}

function listarComputadorExcluir(id, callback) {

    const select = "SELECT * FROM computadores WHERE id = ?";

    conexao.query(select, [id], function(erro,resultado) {

        if (erro) {
            console.log("Erro ao procuar esse computador!");
            console.log(erro);

            callback(null);
        } else if (resultado.length ===0) {
            console.log("Computador não encontrado!");

            callBack(null);
        } else {
            // resultado[0] é o computador com ID informado
            callback(resultado[0]);
        }
    });
}
function listarComputadores() {

    const sql = "SELECT * FROM computadores";

    conexao.query(sql, function (erro, computadores) {

        if (erro) {
            console.log("Erro ao listar os computador.");
            console.log(erro);
        } else {
            console.log("\n===== COMPUTADOR =====");
            computadores.forEach(function (computadores) {
                console.log(
                    computadores.id +" - "+
                    computadores.patrimonio +" - "+
                    computadores.localizacao
                );
            });
        }

        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar computadores");
    console.log("2 - Excluir computadores");
    console.log("3 - Listar computadores");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarComputadores();

    } else if (opcao === 2) {

        excluirComputadores();

    } else if (opcao === 3) {

        listarComputadores();

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