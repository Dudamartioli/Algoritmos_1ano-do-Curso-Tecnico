class Carro {
    constructor(placa, modelo, marca, ano) {
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.ano = ano;
    }
}

let listacarros=[]

function adicionarcarro(){
    let placa=document.getElementById("inputplaca").value
    let modelo=document.getElementById("inputmodelo").value
    let marca=document.getElementById("inputmarca").value
    let ano=document.getElementById("inputano").value
    let carro= new Carro(placa, modelo, marca, ano)
    listacarros.push(carro)

    mostrarlista()
}

function mostrarlista(){
    let listagem = "<br>"
    for(let i=0;i<listacarros.length; i++){
        const linha = listacarros[i]
        listagem += linha.placa + " - " + linha.modelo + " - " + linha.marca + " - " + linha.ano + "<br>"  
    }
    document.getElementById("saidaVetor").innerHTML=listagem
}

function marcasdecarro(){
    debugger
    let marcaprocurada = document.getElementById("inputmarcanovo").value

    let resp=""
    for(let i=0; i<listacarros.length; i++){
        let carro = listacarros[i]
        if(carro.marca==marcaprocurada){
            resp+= carro.placa + " - " + carro.modelo + " - " + carro.marca + " - " + carro.ano + "<br>"
        }
    }
    document.getElementById("respmarca").innerHTML= resp
}