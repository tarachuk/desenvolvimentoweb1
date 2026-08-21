const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loja"
});

// Funcao cadastrar produto
function cadastrarProduto() {

  const nome = readline.question("Digite o nome: ");
  const preco = readline.question("Digite o preço: ");
  const quantidade = readline.question("Digite a quantidade: ");

    const insert = "INSERT INTO produtos (nome, preco, quantidade) VALUES (?,?,?)";

    conexao.query(insert, [nome, preco, quantidade], function(erro){

        if (erro) {
          console.log("Produto não cadastrado!");
            console.log(erro);
        } else {
            console.log("Produto cadatrado. :)");
        };
        menu();
    });
}

// Funcao exluir produto
function excluirProduto() {

    const id = readline.question("Digite o id do produto: ");
    
    const deletar = "DELETE FROM produtos WHERE id = ?";

    conexao.query(deletar, [id], function (erro,resultado) {

        if (erro) {
            console.log("Erro ao excluir produto!");
            console.log(erro);
        } else if (resultado.affectedRows === 0) {
            console.log("Produto não encontrado.");
        } else {
            console.log("Excluido com sucesso!");
        }

        menu();
    });
}

// Funcao listar produto
function listarProduto() {

    const sql = "SELECT * FROM produtos";

    conexao.query(sql, function (erro, produtos) {

        if (erro) {
            console.log("Erro ao listar produtos!!");
        } else { 
            console.log("\n===== PRODUTOS =====");
            produtos.forEach( function (produtos){
                console.log(
                    produtos.id +" - "+
                    produtos.nome +" - "+
                    produtos.preco +" - "+
                    produtos.quantidade
                );
            });
        }
        menu();
    });
}

// Menu principal

function menu() {

    console.log("\n===== Menu =====");
    console.log("1 - Cadastrar produto");
    console.log("2 - Excluir produto");
    console.log("3 - Listar produto");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1){

        cadastrarProduto();

    } else if (opcao === 2) {

        excluirProduto();

    } else if (opcao === 3) {

        listarProduto();

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