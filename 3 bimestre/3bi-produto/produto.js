let listaDeProdutos = []; //variável global que armazena os produtos cadastrados

function inserirDadosIniciais() { //esta função será excluída quando terminarem os testes
    listaDeProdutos.push(new Produto(1, "Queijo Mussarela", 39.99, 50, "Frios", "kg"));
    listaDeProdutos.push(new Produto(3, "Salame", 45.00, 20, "Frios", "kg"));
    listaDeProdutos.push(new Produto(4, "Mortadela", 25.50, 40, "Frios", "kg"));
    listaDeProdutos.push(new Produto(6, "Peito de Peru", 45.00, 15, "Frios", "kg"));
    listaDeProdutos.push(new Produto(7, "Refrigerante Cola", 5.99, 100, "Bebidas", "litro"));
    listaDeProdutos.push(new Produto(8, "Suco de Laranja", 8.50, 50, "Bebidas", "litro"));
    listaDeProdutos.push(new Produto(9, "Detergente Líquido", 3.49, 200, "Limpeza", "unidade"));
    listaDeProdutos.push(new Produto(10, "Sabão em Pó", 15.00, 80, "Limpeza", "kg"));
    listaDeProdutos.push(new Produto(11, "Pão Francês", 12.00, 60, "Padaria", "kg"));
    listaDeProdutos.push(new Produto(12, "Bolo de Chocolate", 30.00, 10, "Padaria", "unidade"));
    
    document.getElementById("outputLista").innerHTML= gerarPrint(listaDeProdutos)
}
function gerarPrint(listaDeProdutos) {
    let resp = "";
    for (let i = 0; i < listaDeProdutos.length; i++) {
        const prod = listaDeProdutos[i];
        resp += prod.id + " - " + prod.nome + " - " + prod.precoUnitario + " - " +
            prod.quantidadeEstoque + " - " + prod.categoria + " - " + prod.unidadeDeMedida + "<br>"
    }
    return resp;
}

function inserirProduto() {
    debugger
    let id=parseInt(document.getElementById("id").value)
    let nome=document.getElementById("nome").value
    let precoUnitario=parseFloat(document.getElementById("precoUnitario").value)
    let quantidadeEstoque=parseInt(document.getElementById("quantidadeEstoque").value)
    let categoria=document.getElementById("categoria").value
    let unidadeDeMedida=document.getElementById("unidadeDeMedida").value

    listaDeProdutos.push(new Produto(id, nome, precoUnitario, quantidadeEstoque, categoria, unidadeDeMedida))
 
    document.getElementById("outputLista").innerHTML= gerarPrint(listaDeProdutos) 
} // adicione um produto na lista.

function listarProdutos() {
    document.getElementById("outputLista").innerHTML= gerarPrint(listaDeProdutos)
} //  listar todos os produtos cadastrados


function valorTotalDoEstoque() {
    let estoque = 0
    for(let i =0; i<listaDeProdutos.length; i++){
        estoque+= listaDeProdutos[i].quantidadeEstoque * listaDeProdutos[i].precoUnitario
    }
    document.getElementById("estoque").innerHTML= "O valor total é " + estoque.toFixed(2) + " reais"
} //  - calcular e mostrar o valor total do estoque. Deve-se considerar as quantidades e os preços dos produtos na lista.

function mostreProdutosDeUmaCategoria() {
    let procurar=document.getElementById("procurarcategoria").value
    let achado="<br>"
    for(let i=0; i<listaDeProdutos.length; i++){
        if(listaDeProdutos[i].categoria == procurar){
            achado+= listaDeProdutos[i].id +" - "+ listaDeProdutos[i].nome +" - "+ listaDeProdutos[i].precoUnitario +
            " - "+ listaDeProdutos[i].quantidadeEstoque +" - "+ listaDeProdutos[i].categoria +" - "+ listaDeProdutos[i].unidadeDeMedida + "<br>"
        }
    }
    document.getElementById("respcategoria").innerHTML= achado
} // - mostrar os produtos de uma determinada categoria.

function filtrarProdutosPorPreco() { 
    let minimo = parseFloat(document.getElementById("minimo").value)
    let maximo = parseFloat(document.getElementById("maximo").value)
    let filtrado="<br>"
    for(let i=0; i<listaDeProdutos.length; i++){
        if(listaDeProdutos[i].precoUnitario>=minimo && listaDeProdutos[i].precoUnitario<=maximo){
            filtrado+= listaDeProdutos[i].id +" - "+ listaDeProdutos[i].nome +" - "+ listaDeProdutos[i].precoUnitario +
            " - "+ listaDeProdutos[i].quantidadeEstoque +" - "+ listaDeProdutos[i].categoria +" - "+ listaDeProdutos[i].unidadeDeMedida + "<br>"
        }
    }
    document.getElementById("resppreco").innerHTML= filtrado
}
// - filtrar os produtos que estão dentro de uma faixa de preço (mínimo e máximo) informada pelo usuário.


// usar bubble sort nos dois métodos abaixo
function ordenarProdutosPorNome() {
} // - ordenar os produtos por nome (ordem alfabética) e mostrar a lista ordenada.

function ordenarProdutosPorPreco() { 
     for (let i = 0; i < listaDeProdutos.length - 1; i++) {
        for (let j = 0; j < listaDeProdutos.length - i - 1; j++) {
            if (listaDeProdutos[j].precoUnitario > listaDeProdutos[j + 1].precoUnitario) {
                // troca
                let temp = listaDeProdutos[j];
                listaDeProdutos[j] = listaDeProdutos[j + 1];
                listaDeProdutos[j + 1] = temp;
            }
        }
    }

    // mostrar na tela
    let resultado = "<br>";
    for (let i = 0; i < listaDeProdutos.length; i++) {
        resultado += listaDeProdutos[i].nome + " - R$ " + listaDeProdutos[i].precoUnitario + "<br>";
    }
    document.getElementById("respordempreco").innerHTML = resultado;
} // - ordenar os produtos por preço (ordem crescente) e mostrar a lista ordenada.