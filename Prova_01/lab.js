const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "laboratorio_avaliacao"
});

// Inserir Computadores
function cadastrarComputadores() {

    const insert = 
        `INSERT INTO computadores
        (patrimonio, localizacao, responsavel, situacao)
        VALUES (?, ?, ?, ?)`;
    
    const patrimonio = readline.question("Digite o patrimônio: ");
    const localizacao = readline.question("Digite a localização: ");
    const responsavel = readline.question("Digite o responsavel: ");
    const situacao = readline.question("Digite status: ");

    conexao.query(insert, [patrimonio, localizacao, responsavel,
                situacao], function (erro) {
        
        if (erro) {
            console.log("Erro ao cadastrar computador!!");
            console.log(erro);
        } else {
            console.log("Computador cadastrado com sucesso.");
        }
        menu();
    });
}

// Listar Computadores
function listarComputadores() {

    const sql = "SELECT * FROM computadores";

    conexao.query(sql, function (erro, computador) {

        if (erro) {
            console.log("Erro ao listar computadores!");
            console.log(erro);
        } else if (computador.length === 0) {
            console.log("\nNenhum computador cadastrado.");
        } else {
            console.log("===== COMPUTADORES CADASTARDOS =====");
            computador.forEach(function (computador) {
                console.log(
                    computador.id+" - "+
                    computador.patrimonio+" - "+
                    computador.localizacao+" - "+
                    computador.responsavel+" - "+
                    computador.situacao
                );
            });
        }
        
        menu();
    });
}

// Atualizar computadores
function atualizarComputadores() {
    const id = readline.question(
        "Digite o ID do computador que deseja atualizar: "
    );

    listarComputadorExcluir(id, function (computador) {
        if (computador === null) {
            menu();
            return;
        }

        console.log(
            "\nPatrimônio: " + computador.patrimonio +
            "\nLocalização: " + computador.localizacao +
            "\nResponsável: " + computador.responsavel +
            "\nStatus: " + computador.situacao
        );

        const localizacao = readline.question(
            "\nNova localização: "
        );
        const responsavel = readline.question(
            "Novo responsável: "
        );
        const situacao = readline.question(
            "Novo status: "
        );

        const update = `
            UPDATE computadores
            SET localizacao = ?, responsavel = ?, situacao = ?
            WHERE id = ?
        `;

        conexao.query(
            update,
            [localizacao, responsavel, situacao, id],
            function (erro, resultado) {
                if (erro) {
                    console.log("Erro ao atualizar computador!!");
                    console.log(erro);
                    return;
                }

                if (resultado.affectedRows === 0) {
                    console.log("Computador não encontrado!");
                    return;
                }

                console.log("Computador atualizado com sucesso.");
                menu();
            }
        );
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
            "\nLocalização: "+computador.localizacao+
            "\nResponsavel: "+computador.responsavel+
            "\nStatus: "+computador.situacao
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
            console.log("Exclusão canselada!")
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
           
            callback(resultado[0]);
        }
    });
}

function menu() {

    console.log("\n===== CONTROLE DO LABORATÓRIO =====");
    console.log("1 - Cadastrar computador");
    console.log("2 - Listar computador");
    console.log("3 - Atualizar computador");
    console.log("4 - Deletar computador")
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarComputadores();

    } else if (opcao === 2) {

        listarComputadores();

    } else if (opcao === 3) {

        atualizarComputadores();

    } else if (opcao === 4) {

        excluirComputadores();
        
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
