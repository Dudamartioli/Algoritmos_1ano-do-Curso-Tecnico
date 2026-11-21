class FilmeClasse {
    constructor(id, titulo, diretor, data, avaliacao, posicaoNaLista) {
        this.id = id;
        this.titulo = titulo;
        this.diretor = diretor;
        this.data = data;
        this.avaliacao = avaliacao;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}