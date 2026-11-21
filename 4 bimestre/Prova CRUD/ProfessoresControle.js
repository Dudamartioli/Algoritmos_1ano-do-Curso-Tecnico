let listaProfessores = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let Professores= null; //variavel global
bloquearAtributos(true);
//backend (não interage com o html)

function procurePorChavePrimaria(chave) {
 for (let i = 0; i < listaProfessores.length; i++) {
  const Professores= listaProfessores[i];
   if (Professores.id_prof== chave) {
    Professores.posicaoNaLista = i;
    return listaProfessores[i];
}
}
return null;//não achou
}

// Função para procurar um elemento pela chave primária   ---------------------------------------------------------
function procure() {
const id_prof = document.getElementById("inputid_prof").value;
if (isNaN(id_prof) || !Number.isInteger(Number(id_prof)) || id_prof<=0) {
mostrarAviso("Precisa ser um número inteiro positivo não nulo");
document.getElementById("inputid_prof").focus();
return;
}

if (id_prof) { // se digitou um Id
Professores= procurePorChavePrimaria(id_prof);
if (Professores) { //achou na lista
mostrarDadosProfessores(Professores);
visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
mostrarAviso("Achou na lista, pode alterar ou excluir");
} else { //não achou na lista
limparAtributos();
visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
mostrarAviso("Não achou na lista, pode inserir");
}
} else {
document.getElementById("inputid_prof").focus();
return;
}
}

//backend->frontend
function inserir() {
 bloquearAtributos(false);
 visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
 oQueEstaFazendo = 'inserindo';
 mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
 document.getElementById("inputid_prof").focus();
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
//gerencia operações inserir, alterar e excluir na lista

// obter os dados a partir do html

let id_prof;
if (Professores == null) {
id_prof = parseInt(document.getElementById("inputid_prof").value);
} else {
id_prof = Professores.id_prof;
}

const nome = document.getElementById("inputnome").value;
const disciplina = document.getElementById("inputdisciplina").value;
const tempo_experiencia = parseInt(document.getElementById("inputtempo_experiencia").value);
const titulacao = document.getElementById("inputtitulacao").value;
const aposentado = document.getElementById("inputaposentado").checked;
const data_contratacao = document.getElementById("inputdata_contratacao").value;

//verificar se o que foi digitado pelo USUÁRIO está correto

if(tempo_experiencia<1){
    alert("Tem que ser maior ou igual a 1")
}

if (id_prof && nome && disciplina && tempo_experiencia && titulacao && data_contratacao) {// se tudo certo
switch (oQueEstaFazendo) {
case 'inserindo':
Professores = new ClasseProfessores(id_prof , nome , disciplina , tempo_experiencia , titulacao , aposentado , data_contratacao);
listaProfessores.push(Professores);
mostrarAviso("Inserido na lista");
break;

case 'alterando':
ProfessoresAlterado = new ClasseProfessores(id_prof , nome , disciplina , tempo_experiencia , titulacao , aposentado , data_contratacao);
listaProfessores[Professores.posicaoNaLista] = ProfessoresAlterado;
mostrarAviso("Alterado");
break;

case 'excluindo':
let novaLista = [];
for (let i = 0; i < listaProfessores.length; i++) {
if (Professores.posicaoNaLista != i) {
novaLista.push(listaProfessores[i]);
}
}

listaProfessores = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

// console.error('Ação não reconhecida: ' + oQueEstaFazendo);
mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputid_prof").focus();
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
linha.id_prof + " - " +
linha.nome + " - " +
linha.disciplina + " - " +
linha.tempo_experiencia + " - " +
linha.titulacao + " - " +
((linha.aposentado) ?"sim":"não") + " - " +
linha.data_contratacao + "<br>";
}
return texto;
}
//backend->frontend (interage com html)
function listar() {
document.getElementById("outputSaida").innerHTML = preparaListagem(listaProfessores);
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
function mostrarDadosProfessores(Professores) {
document.getElementById("inputid_prof").value = Professores.id_prof;
document.getElementById("inputnome").value = Professores.nome;
document.getElementById("inputdisciplina").value = Professores.disciplina;
document.getElementById("inputtempo_experiencia").value = Professores.tempo_experiencia;
document.getElementById("inputtitulacao").value = Professores.titulacao;
document.getElementById("inputaposentado").checked = Professores.aposentado;
document.getElementById("inputdata_contratacao").value = Professores.data_contratacao;


// Define os campos como readonly
bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
document.getElementById("inputnome").value = "";
document.getElementById("inputdisciplina").value = "";
document.getElementById("inputtempo_experiencia").value = "";
document.getElementById("inputtitulacao").value = "";
document.getElementById("inputaposentado").checked = false;
document.getElementById("inputdata_contratacao").value = "";


bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
//quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
document.getElementById("inputid_prof").readOnly = !soLeitura;
document.getElementById("inputnome").readOnly = soLeitura;
document.getElementById("inputdisciplina").readOnly = soLeitura;
document.getElementById("inputtempo_experiencia").readOnly = soLeitura;
document.getElementById("inputtitulacao").disabled = soLeitura;
document.getElementById("inputaposentado").readOnly = soLeitura;
document.getElementById("inputdata_contratacao").readOnly = soLeitura;
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
document.getElementById("inputid_prof").focus();
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
let nomeDoArquivoDestino = "./Professores.csv";  //define o matricula do arquivo csv
let textoCSV = "";
for (let i = 0; i < listaProfessores.length; i++) {
const linha = listaProfessores[i]; //variavel linha contem as informações de cada imovel
textoCSV += 
linha.id_prof + "; " + 
linha.nome + "; " + 
linha.disciplina + "; " + 
linha.tempo_experiencia + "; " + 
linha.titulacao + "; " + 
linha.aposentado + "; " + 
linha.data_contratacao}
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
if (dados.length === 7) { //verifica os seis campos
// Adiciona os dados à listaImovel como um objeto
listaProfessores.push({
id_prof: dados[0], 
nome: dados[1], 
disciplina: dados[2], 
tempo_experiencia: dados[3], 
titulacao: dados[4], 
aposentado: dados[5], 
data_contratacao: dados[6] });
}
}
}
listar(); //exibe a lista atualizada
};
leitor.readAsText(arquivo); // Lê o arquivo como texto
}

function ListarPorTitulacao(){
  let listatitulacao = []
  let titulacaoSelecionada = document.getElementById("inputFiltraTitulacao").value
  for(let i=0; i<listaProfessores.length;i++){
    if(titulacaoSelecionada == listaProfessores[i].titulacao){
      listatitulacao.push(listaProfessores[i])
    }
  }
  document.getElementById("outputSaida").innerHTML = preparaListagem(listatitulacao);
}

function ListarProfessoresSobrenomeS() {
  let listaSobrenomeS = [];

  for (let i = 0; i < listaProfessores.length; i++) {
    let nome = listaProfessores[i].nome;

    let partes = nome.split(" ");           // separa o nome
    let ultimoSobrenome = partes[partes.length - 1];

    // pega só a primeira letra assim:
    let primeiraLetra = ultimoSobrenome[0].toUpperCase(); 

    if (primeiraLetra === "S") {
      listaSobrenomeS.push(listaProfessores[i]);
    }
  }

  document.getElementById("outputSaida").innerHTML = preparaListagem(listaSobrenomeS);
}
