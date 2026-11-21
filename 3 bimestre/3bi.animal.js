class Animal {
    constructor(id, nome, raca, dataNascimento, tutor) {
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.ano = ano;
    }
}

let listacarros=[]

function adicionarcarro(){
    let id=document.getElementById("inputid").value
    let nome=document.getElementById("inputnome").value
    let raca=document.getElementById("inputraca").value
    let dataNascimento=document.getElementById("inputdata").value
    let tutor=document.getElementById("inputtutor").value
    let Animal= new Animal(id, nome, raca, dataNascimento, tutor)
    listacarros.push(Animal)

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