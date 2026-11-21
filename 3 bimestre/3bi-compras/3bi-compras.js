let lista=[]

function fdadosiniciais(){
    let compra = new Compras("Rodrigo Garro", 1 , 24000000)
    lista.push(compra)
    compra= new Compras("Memphis Depay", 1, 82000000)
    lista.push(compra)
    compra= new Compras("Bagre", 20, 5)
    lista.push(compra)
    compra= new Compras("Hugo Souza", 1, 8000000)
    lista.push(compra)
    compra= new Compras("Yuri Alberto", 1, 13000000)
    lista.push(compra)

    fmostrarlista()
}

function farmazenar(){
    let nome= document.getElementById("inputproduto").value
    let quantidade= parseInt(document.getElementById("inputquantidade").value)
    let preco=parseFloat(document.getElementById("inputpreco").value)
    let compras= new Compras(nome, quantidade, preco)
    if(fverificar(compras)){
        alert("Esse produto já existe!")
    }else{
        lista.push(compras)
    }

    fmostrarlista()
}

function fverificar(compras){
    for(let i=0; i<lista.length; i++){
        if(lista[i].nome.toLowerCase() === compras.nome.toLowerCase()){
            return true
        }else{
            return false
        }
    }
}

function fmostrarlista(){
    let listagem = "<br>"
    for(let i=0; i<lista.length; i++){
        const linha=lista[i]
        listagem+= linha.nome + " - " + linha.quantidade + " - " + linha.preco + "<br>"
    }

    document.getElementById("resp").innerHTML= listagem
}

function fmultiplicar(){
    let resppreco= "<br>"
    let respnome="<br>"
    let resp="<br>"
    for(let i=0; i<lista.length; i++){
    resppreco= lista[i].quantidade * lista[i].preco
    respnome= lista[i].nome
    resp+= respnome + " - " + resppreco + "<br>"
    }
    document.getElementById("multiplicacao").innerHTML= resp
}

function ftotal(){
    let subtotal=0
    let total=0
    for(let i=0; i<lista.length; i++){
        subtotal= lista[i].quantidade * lista[i].preco
        total+= subtotal
    }
    document.getElementById("resptotal").innerHTML = "= " + total
}  

function fachar(){
    let nome=document.getElementById("inputachar").value;
    let resp=""
    for(let i=0; i<lista.length; i++){
        if(lista[i].nome==nome){
            resp= "Quantidade = " + lista[i].quantidade + ", preço = " + lista[i].preco
        }else{
            resp= "esse produto não está na lista"
        }
    }
    document.getElementById("respachar").innerHTML=resp
}

function fcaro(){
    let maiscaro= lista[0]
    let maiorvalor=lista[0].quantidade*lista[0].preco
    let valoratual=0
    for(let i=1; i<lista.length; i++){
        valoratual=lista[i].quantidade*lista[i].preco

        if(valoratual>maiorvalor){
            resp= valoratual
            maiscaro= lista[i]
        }
    }
    document.getElementById("respcaro").innerHTML= "O mais caro é " + maiscaro.nome + ", com " + maiscaro.quantidade + " unidades e " +
     maiscaro.preco.toFixed(2) + " reais, seu total é " + maiscaro.quantidade*maiscaro.preco.toFixed(2) + " reais"
}

function fitens(){
    let resp=0
    for(let i=0; i<lista.length; i++){
        resp+= lista[i].quantidade
    }
    document.getElementById("respitens").innerHTML= resp + " itens"
}