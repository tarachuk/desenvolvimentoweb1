function desconto(descontos, preco){
  var valorDesconto = descontos/100
  var  valorFinal = preco-(preco * valorDesconto)
    console.log("O produto de R$",preco," com ",descontos,"% de desconto custa R$",valorFinal)
}

var descontos = 10
var preco = 100

desconto(descontos,preco)