let listaMotorista = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let Motorista= null; //variavel global
bloquearAtributos(true);
//backend (não interage com o html)

function procurePorChavePrimaria(chave) {
 for (let i = 0; i < listaMotorista.length; i++) {
  const Motorista= listaMotorista[i];
   if (Motorista.id_motorista== chave) {
    Motorista.posicaoNaLista = i;
    return listaMotorista[i];
}
}
return null;//não achou
}

// Função para procurar um elemento pela chave primária   ---------------------------------------------------------
function procure() {
const id_motorista = document.getElementById("inputid_motorista").value;
if (isNaN(id_motorista) || !Number.isInteger(Number(id_motorista)) || id_motorista<=0) {
mostrarAviso("Precisa ser um número inteiro positivo não nulo");
document.getElementById("inputid_motorista").focus();
return;
}

if (id_motorista) { // se digitou um Id
Motorista= procurePorChavePrimaria(id_motorista);
if (Motorista) { //achou na lista
mostrarDadosMotorista(Motorista);
visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
mostrarAviso("Achou na lista, pode alterar ou excluir");
} else { //não achou na lista
limparAtributos();
visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
mostrarAviso("Não achou na lista, pode inserir");
}
} else {
document.getElementById("inputid_motorista").focus();
return;
}
}

//backend->frontend
function inserir() {
 bloquearAtributos(false);
 visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
 oQueEstaFazendo = 'inserindo';
 mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
 document.getElementById("inputid_motorista").focus();
}

// Função para alterar um elemento da lista
function alterar() {
  // Remove o readonly dos campos
  bloquearAtributos(false);
  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
  oQueEstaFazendo = 'alterando';
  mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}
// Função para excluir um elemento da lista
function excluir() {
  bloquearAtributos(false);
  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
  oQueEstaFazendo = 'excluindo';
  mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    debugger
//gerencia operações inserir, alterar e excluir na lista

// obter os dados a partir do html

let id_motorista;
if (Motorista == null) {
id_motorista = parseInt(document.getElementById("inputid_motorista").value);
} else {
id_motorista = Motorista.id_motorista;
}

const nome = document.getElementById("inputnome").value;
const especialidade = document.getElementById("inputespecialidade").value;
const tempo_experiencia = document.getElementById("inputtempo_experiencia").value;
const data_admissao = document.getElementById("inputdata_admissao").value;
const habilitadoParaMoto = document.getElementById("inputhabilitadoParaMoto").checked;

//verificar se o que foi digitado pelo USUÁRIO está correto

let vetNome = []
nomeVet = (nome).split(" ")
vetNome.push(nomeVet)
if(nomeVet.length <= 1){
        alert("O nome tem que ter no minimo 2 palavras")
        return
    }

if (id_motorista && nome && especialidade && tempo_experiencia && data_admissao) {// se tudo certo
switch (oQueEstaFazendo) {
case 'inserindo':
Motorista = new ClasseMotorista(id_motorista , nome , especialidade , tempo_experiencia , data_admissao , habilitadoParaMoto);
listaMotorista.push(Motorista);
mostrarAviso("Inserido na lista");
break;

case 'alterando':
MotoristaAlterado = new ClasseMotorista(id_motorista , nome , especialidade , tempo_experiencia , data_admissao , habilitadoParaMoto);
listaMotorista[Motorista.posicaoNaLista] = MotoristaAlterado;
mostrarAviso("Alterado");
break;

case 'excluindo':
let novaLista = [];
for (let i = 0; i < listaMotorista.length; i++) {
if (Motorista.posicaoNaLista != i) {
novaLista.push(listaMotorista[i]);
}
}

listaMotorista = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

// console.error('Ação não reconhecida: ' + oQueEstaFazendo);
mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputid_motorista").focus();
} else {
alert("Erro nos dados digitados");
return;
}
}

//backend
function preparaListagem(vetor) {
let texto = "";
for (let i = 0; i < vetor.length; i++) {
const linha = vetor[i];
texto +=
linha.id_motorista + " - " +
linha.nome + " - " +
linha.especialidade + " - " +
linha.tempo_experiencia + " - " +
linha.data_admissao + " - " +
((linha.habilitadoParaMoto) ?"sim":"não") + "<br>";
}
return texto;
}
//backend->frontend (interage com html)
function listar() {
document.getElementById("outputSaida").innerHTML = preparaListagem(listaMotorista);
}
function cancelarOperacao() {
limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
//printa a mensagem na divAviso
document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do imovel nos campos
function mostrarDadosMotorista(Motorista) {
document.getElementById("inputid_motorista").value = Motorista.id_motorista;
document.getElementById("inputnome").value = Motorista.nome;
document.getElementById("inputespecialidade").value = Motorista.especialidade;
document.getElementById("inputtempo_experiencia").value = Motorista.tempo_experiencia;
document.getElementById("inputdata_admissao").value = Motorista.data_admissao;
document.getElementById("inputhabilitadoParaMoto").checked = Motorista.habilitadoParaMoto;


// Define os campos como readonly
bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
document.getElementById("inputnome").value = "";
document.getElementById("inputespecialidade").value = "";
document.getElementById("inputtempo_experiencia").value = "";
document.getElementById("inputdata_admissao").value = "";
document.getElementById("inputhabilitadoParaMoto").checked = false;


bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
//quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
document.getElementById("inputid_motorista").readOnly = !soLeitura;
document.getElementById("inputnome").readOnly = soLeitura;
document.getElementById("inputespecialidade").readOnly = soLeitura;
document.getElementById("inputtempo_experiencia").readOnly = soLeitura;
document.getElementById("inputdata_admissao").readOnly = soLeitura;
document.getElementById("inputhabilitadoParaMoto").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
//  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
//none significa que o botão ficará invisível (visibilidade == none)
//inline significa que o botão ficará visível 

document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
document.getElementById("inputid_motorista").focus();
}

function persistirEmLocalPermanente(arquivoDestino, conteudo) {
/*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
criando um arquivo temporário*/
const blob = new Blob([conteudo], { type: 'text/plain' });
//cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
link.href = URL.createObjectURL(blob);
link.download = arquivoDestino; // Nome do arquivo de download
link.click(); //inicia o processo de dowload automaticamente
// Libera o objeto URL
URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
}

// Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
function abrirArquivoSalvoEmLocalPermanente() {

const input = document.createElement('input');
//cria o elemento input do tipo file (serve para abrir o seletor de arquivos)
input.type = 'file';
input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local
input.onchange = function (event) {
/*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo
O evento change é disparado quando um arquivo é selecionado*/
const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo
console.log(arquivo.name);
if (arquivo) {
converterDeCSVparaListaObjeto(arquivo);
}
/*verifica se um arquivo foi selecionado: 
se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
permitindo que o arquivo seja lido e processado na função processarArquivo*/
};
input.click(); //seletor de arquivos exibido automaticamente  
}

function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente.
let nomeDoArquivoDestino = "./Motorista.csv";  //define o matricula do arquivo csv
let textoCSV = "";
for (let i = 0; i < listaMotorista.length; i++) {
const linha = listaMotorista[i]; //variavel linha contem as informações de cada imovel
textoCSV += 
linha.id_motorista + "; " + 
linha.nome + "; " + 
linha.especialidade + "; " + 
linha.tempo_experiencia + "; " + 
linha.data_admissao + "; " + 
linha.habilitadoParaMoto}
persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}

// Função para processar o arquivo CSV e transferir os dados para a listaImovel
function converterDeCSVparaListaObjeto(arquivo) {
const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
leitor.onload = function (e) {
const conteudo = e.target.result; // Conteúdo do arquivo CSV
const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
listaImovel = []; // Limpa a lista atual (se necessário)
for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
if (linha) { //verifica se a linha não está vazia
const dados = linha.split(';'); // Separa os dados por ';'
if (dados.length === 6) { //verifica os seis campos
// Adiciona os dados à listaImovel como um objeto
listaMotorista.push({
id_motorista: dados[0], 
nome: dados[1], 
especialidade: dados[2], 
tempo_experiencia: dados[3], 
data_admissao: dados[4], 
habilitadoParaMoto: dados[5] });
}
}
}
listar(); //exibe a lista atualizada
};
leitor.readAsText(arquivo); // Lê o arquivo como texto
}

function FiltrarNome(){
    let listarNome = [];
  let selecionadoNome = document.getElementById("inputFiltrarNome").value

  for (let i = 0; i < listaMotorista.length; i++) {
    let nome = listaMotorista[i].nome;

    let partesNome = nome.split(" ");           // separa o nome
    let primeiroNome = partesNome[0];

    if (primeiroNome == selecionadoNome) {
      listarNome.push(listaMotorista[i]);
    }
  }

  document.getElementById("outputSaida").innerHTML = preparaListagem(listarNome);
}

function FiltrarEspecialidade(){
    let filtrarEspecialidade = [];
    let especialidadeSelecionada = document.getElementById("inputFiltrarEspecialidade").value

  for (let i = 0; i < listaMotorista.length; i++) {
    let especialidade = listaMotorista[i].especialidade;

    if (especialidade==especialidadeSelecionada) {
      filtrarEspecialidade.push(listaMotorista[i]);
    }
  }

  document.getElementById("outputSaida").innerHTML = preparaListagem(filtrarEspecialidade);
}

function FiltrarTempoDeExperiencia(){
    let filtrarTempoDeExperiencia = [];
    let tempoexperienciaSelecionada = document.getElementById("inputFiltrarTempoDeExperiencia").value

  for (let i = 0; i < listaMotorista.length; i++) {
    let tempoexperiencia = listaMotorista[i].tempo_experiencia;

    if (tempoexperiencia==tempoexperienciaSelecionada) {
      filtrarTempoDeExperiencia.push(listaMotorista[i]);
    }
  }

  document.getElementById("outputSaida").innerHTML = preparaListagem(filtrarTempoDeExperiencia);
}

function ListarUltimoNome() {
  let listarUltimoNome = [];
  let selecionado = document.getElementById("inputListarUltimoNome").value

  for (let i = 0; i < listaMotorista.length; i++) {
    let ultimoNome = listaMotorista[i].nome;

    let partes = ultimoNome.split(" ");           // separa o nome
    let ultimoSobrenome = partes[partes.length - 1];

    if (ultimoSobrenome== selecionado) {
      listarUltimoNome.push(listaMotorista[i]);
    }
  }

  document.getElementById("outputSaida").innerHTML = preparaListagem(listarUltimoNome);
}