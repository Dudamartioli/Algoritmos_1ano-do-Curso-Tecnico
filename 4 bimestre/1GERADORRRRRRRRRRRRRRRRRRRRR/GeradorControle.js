        
        function gerarControle() {
            nomeClasse = document.getElementById("inputNomeClasse").value

            let tipos = (document.getElementById("inputTipos").value).toLowerCase()
            let vetTipos = tipos.split(";")
            
            let atributos = document.getElementById("inputAtributos").value;
            let vetAtributos = atributos.split(",");

            codigoFonte = 
                "let lista" + nomeClasse + " = []; //conjunto de dados\n" +
                "let oQueEstaFazendo = ''; //variável global de controle\n" +
                "let " + nomeClasse + "= null; //variavel global\n" +
                "bloquearAtributos(true);\n" +
                "//backend (não interage com o html)\n\n" +

                "function procurePorChavePrimaria(chave) {\n" + 
                    " for (let i = 0; i < lista" + nomeClasse + ".length; i++) {\n" + 
                "  const " +  nomeClasse + "= lista" + nomeClasse +"[i];\n" + 
                   "   if (" + nomeClasse + "." + vetAtributos[0]  + "== chave) {\n" + 
                       "    "+ nomeClasse + ".posicaoNaLista = i;\n" +
                       "    return lista" + nomeClasse + "[i];\n" +
                    "}\n" + 
                "}\n" +
                "return null;//não achou\n" +
                "}\n\n" +


                "// Função para procurar um elemento pela chave primária   ---------------------------------------------------------\n" +
                "function procure() {\n" +
                "const "+ vetAtributos[0] +" = document.getElementById(\"input"+ vetAtributos[0] +"\").value;\n" +
                 "if (isNaN(" + vetAtributos[0] +") || !Number.isInteger(Number("+ vetAtributos[0] +")) || " + vetAtributos[0] +"<=0) {\n" +
                   "mostrarAviso(\"Precisa ser um número inteiro positivo não nulo\");\n" +
                   "document.getElementById(\"input"+ vetAtributos[0] +"\").focus();\n" +
                   "return;\n" +
                "}\n\n" +

                 "if ("+ vetAtributos[0] +") { // se digitou um Id\n" +
                    nomeClasse +"= procurePorChavePrimaria("+ vetAtributos[0] +");\n" +
                   "if ("+ nomeClasse +") { //achou na lista\n" +
                      "mostrarDados" + nomeClasse +"(" + nomeClasse + ");\n" +
                      "visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir\n" +
                      "mostrarAviso(\"Achou na lista, pode alterar ou excluir\");\n" +
                    "} else { //não achou na lista\n" +
                      "limparAtributos();\n" +
                      "visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');\n" +
                      "mostrarAviso(\"Não achou na lista, pode inserir\");\n" +
                    "}\n" +
                    "} else {\n" +
                      "document.getElementById(\"input" + vetAtributos[0] + "\").focus();\n" +
                      "return;\n" +
                    "}\n" +
                    "}\n\n" +

                    "//backend->frontend\n" +
                    "function inserir() {\n" +
                    " bloquearAtributos(false);\n"+
                    " visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)\n"+
                    " oQueEstaFazendo = 'inserindo';\n"+
                    " mostrarAviso(\"INSERINDO - Digite os atributos e clic o botão salvar\");\n"+
                    " document.getElementById(\"input" + vetAtributos[0] +"\").focus();\n"+
                    "}\n\n"+

                    "// Função para alterar um elemento da lista\n" +
                    "function alterar() {\n"+

                    "  // Remove o readonly dos campos\n"+
                    "  bloquearAtributos(false);\n"+

                    "  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n"+

                    "  oQueEstaFazendo = 'alterando';\n"+
                    "  mostrarAviso(\"ALTERANDO - Digite os atributos e clic o botão salvar\");\n"+
                    "}\n"+

                    "// Função para excluir um elemento da lista\n"+
                    "function excluir() {\n"+
                    "  bloquearAtributos(false);\n"+
                    "  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)\n"+

                    "  oQueEstaFazendo = 'excluindo';\n"+
                    "  mostrarAviso(\"EXCLUINDO - clic o botão salvar para confirmar a exclusão\");\n"+
                    "}\n\n" +

                    "function salvar() {\n"+
                    "//gerencia operações inserir, alterar e excluir na lista\n\n"+

                    "// obter os dados a partir do html\n\n"+

                    "let "+ vetAtributos[0] +";\n"+
                    "if ("+ nomeClasse + " == null) {\n"+
                    vetAtributos[0] + " = parseInt(document.getElementById(\"input" + vetAtributos[0] + "\").value);\n"+
                    "} else {\n"+
                    vetAtributos[0] +" = " + nomeClasse +"."+ vetAtributos[0] + ";\n"+
                    "}\n\n"+

                    criarCONST(vetAtributos, vetTipos) +

                    "\n//verificar se o que foi digitado pelo USUÁRIO está correto\n\n"+

                    "if ("+ criarparametrosEE(vetAtributos, vetTipos) +") {// se tudo certo\n"+
                    "switch (oQueEstaFazendo) {\n"+
                    "case 'inserindo':\n"+
                    nomeClasse +" = new Classe"+ nomeClasse +"("+ criarparametros(vetAtributos) +");\n"+
                    "lista"+ nomeClasse +".push("+ nomeClasse +");\n"+
                    "mostrarAviso(\"Inserido na lista\");\n"+
                    "break;\n\n"+

                    "case 'alterando':\n"+
                    nomeClasse + "Alterado = new Classe"+ nomeClasse +"("+ criarparametros(vetAtributos) +");\n"+
                    "lista" + nomeClasse +"["+ nomeClasse +".posicaoNaLista] = "+ nomeClasse+"Alterado;\n"+
                    "mostrarAviso(\"Alterado\");\n"+
                    "break;\n\n"+

                    "case 'excluindo':\n"+
                    "let novaLista = [];\n"+
                    "for (let i = 0; i < lista"+ nomeClasse +".length; i++) {\n"+
                    "if ("+ nomeClasse +".posicaoNaLista != i) {\n"+
                    "novaLista.push(lista"+ nomeClasse +"[i]);\n"+
                    "}\n"+
                    "}\n\n"+

                    "lista"+ nomeClasse +" = novaLista;\n"+
                    "mostrarAviso(\"EXCLUIDO\");\n"+
                    "break;\n"+
                    "default:\n\n"+

                    "// console.error('Ação não reconhecida: ' + oQueEstaFazendo);\n"+
                    "mostrarAviso(\"Erro aleatório\");\n"+
                    "}\n"+
                    "visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');\n"+
                    "limparAtributos();\n"+
                    "listar();\n"+
                    "document.getElementById(\"input" + vetAtributos[0] + "\").focus();\n"+
                    "} else {\n"+
                    "alert(\"Erro nos dados digitados\");\n"+
                    "return;\n"+
                    "}\n" +
                    "}\n\n"+

                    "//backend\n" +
                    "function preparaListagem(vetor) {\n"+
                    "let texto = \"\";\n"+
                    "for (let i = 0; i < vetor.length; i++) {\n"+
                    "const linha = vetor[i];\n"+
                    "texto +=\n"+
                    criarLista(vetAtributos, vetTipos) +
                    "}\n"+
                    "return texto;\n"+
                    "}\n"+

                    "//backend->frontend (interage com html)\n"+
                    "function listar() {\n"+
                    "document.getElementById(\"outputSaida\").innerHTML = preparaListagem(lista" + nomeClasse +");\n"+
                    "}\n"+

                    "function cancelarOperacao() {\n"+
                    "limparAtributos();\n"+
                    "bloquearAtributos(true);\n"+
                    "visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');\n"+
                    "mostrarAviso(\"Cancelou a operação de edição\");\n"+
                    "}\n\n"+

                    "function mostrarAviso(mensagem) {\n"+
                    "//printa a mensagem na divAviso\n"+
                    "document.getElementById(\"divAviso\").innerHTML = mensagem;\n"+
                    "}\n\n"+

                    "// Função para mostrar os dados do imovel nos campos\n"+
                    "function mostrarDados"+ nomeClasse +"("+ nomeClasse +") {\n"+
                    mostrarDados(nomeClasse, vetAtributos, vetTipos)+


                    "\n\n// Define os campos como readonly\n"+
                    "bloquearAtributos(true);\n"+
                    "}\n\n"+

                    "// Função para limpar os dados dos campos\n"+
                    "function limparAtributos() {\n"+
                    limpar(vetAtributos, vetTipos) +

                    "\n\nbloquearAtributos(true);\n"+
                    "}\n\n"+

                    "function bloquearAtributos(soLeitura) {\n"+
                    "//quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa\n"+
                    "document.getElementById(\"input"+ vetAtributos[0] +"\").readOnly = !soLeitura;\n" +
                    bloquear(vetAtributos)+
                    
                    "}\n\n"+

                    "// Função para deixar visível ou invisível os botões\n"+
                    "function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {\n"+
                    "//  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n"+
                    "//none significa que o botão ficará invisível (visibilidade == none)\n"+
                    "//inline significa que o botão ficará visível \n\n"+

                    "document.getElementById(\"btProcure\").style.display = btProcure;\n"+
                    "document.getElementById(\"btInserir\").style.display = btInserir;\n"+
                    "document.getElementById(\"btAlterar\").style.display = btAlterar;\n"+
                    "document.getElementById(\"btExcluir\").style.display = btExcluir;\n"+
                    "document.getElementById(\"btSalvar\").style.display = btSalvar;\n"+
                    "document.getElementById(\"btCancelar\").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar\n"+
                    "document.getElementById(\"input" + vetAtributos[0] +"\").focus();\n"+
                    "}\n\n"+

                    "function persistirEmLocalPermanente(arquivoDestino, conteudo) {\n"+
                    "/*cria um blob (objeto que representa dados de arquivo) que armazena \"[conteudo]\" como arquivo de texto,\n"+
                    "criando um arquivo temporário*/\n"+
                    "const blob = new Blob([conteudo], { type: 'text/plain' });\n"+
                    "//cria o elemento \"a\" (link temporário) usado para adicionar o dowload do arquivo\n"+
                    "const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e\n"+
                    "atribui ela ao href do link para que ele \"aponte\" para o arquivo gerado (permitindo seu download)*/\n"+
                    "link.href = URL.createObjectURL(blob);\n"+
                    "link.download = arquivoDestino; // Nome do arquivo de download\n"+
                    "link.click(); //inicia o processo de dowload automaticamente\n"+
                    "// Libera o objeto URL\n"+
                    "URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)\n"+
                    "}\n\n"+


                    "// Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)\n"+
                    "function abrirArquivoSalvoEmLocalPermanente() {\n\n"+

                    "const input = document.createElement('input');\n"+
                    "//cria o elemento input do tipo file (serve para abrir o seletor de arquivos)\n"+
                    "input.type = 'file';\n"+
                    "input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local\n"+
                    "input.onchange = function (event) {\n"+
                    "/*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo\n"+
                    "O evento change é disparado quando um arquivo é selecionado*/\n"+
                    "const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo\n"+
                    "console.log(arquivo.name);\n"+
                    "if (arquivo) {\n"+
                    "converterDeCSVparaListaObjeto(arquivo);\n"+
                    "}\n"+
                    "/*verifica se um arquivo foi selecionado: \n"+
                    "se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento\n"+
                    "permitindo que o arquivo seja lido e processado na função processarArquivo*/\n"+
                    "};\n"+
                    "input.click(); //seletor de arquivos exibido automaticamente  \n"+  
                    "}\n\n"+

                    "function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente.\n"+
                    "let nomeDoArquivoDestino = \"./"+ nomeClasse +".csv\";  //define o matricula do arquivo csv\n"+ 
                    "let textoCSV = \"\";\n"+
                    "for (let i = 0; i < lista"+ nomeClasse +".length; i++) {\n"+
                    "const linha = lista"+ nomeClasse +"[i]; //variavel linha contem as informações de cada imovel\n"+
                    "textoCSV += \n"+
                    texto(vetAtributos) +
                    "}\n"+
                    "persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);\n"+
                    "}\n\n"+


                    "// Função para processar o arquivo CSV e transferir os dados para a listaImovel\n"+
                    "function converterDeCSVparaListaObjeto(arquivo) {\n"+
                    "const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador \n"+
                    "leitor.onload = function (e) {\n"+
                    "const conteudo = e.target.result; // Conteúdo do arquivo CSV\n"+
                    "const linhas = conteudo.split('\\n\'); // Separa o conteúdo por linha\n"+
                    "listaImovel = []; // Limpa a lista atual (se necessário)\n"+
                    "for (let i = 0; i < linhas.length; i++) {\n"+
                    "const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV\n"+
                    "if (linha) { //verifica se a linha não está vazia\n"+
                    "const dados = linha.split(';'); // Separa os dados por ';'\n"+
                    "if (dados.length === "+ vetAtributos.length +") { //verifica os seis campos\n"+
                    "// Adiciona os dados à listaImovel como um objeto\n"+
                    "lista" + nomeClasse +".push({\n"+
                        lista(vetAtributos)+
                    "});\n"+
                    "}\n"+
                    "}\n"+
                    "}\n"+
                    "listar(); //exibe a lista atualizada\n"+
                    "};\n"+
                    "leitor.readAsText(arquivo); // Lê o arquivo como texto\n"+
                    "}\n"

            document.getElementById("taCodigoFonte").textContent = codigoFonte;
        }

        function criarCONST(vetAtributos, vetTipos){
            //const endereco = document.getElementById(\"inputEndereco\").value;\n"+
            //const bairro = document.getElementById(\"inputBairro\").value;\n\n"+
            respC=""

            for(let i=1; i<vetAtributos.length; i++){
                if(vetTipos[i]=="int"){
                    respC+= "const " + vetAtributos[i] + " = parseInt(document.getElementById(\"input"+ vetAtributos[i] +"\").value);\n" 
                }else if(vetTipos[i]=="float"){
                    respC+= "const " + vetAtributos[i] + " = parseFloat(document.getElementById(\"input"+ vetAtributos[i] +"\").value);\n"
                } else if(vetTipos[i]=="boolean"){
                    respC+= "const " + vetAtributos[i] + " = document.getElementById(\"input"+ vetAtributos[i] +"\").checked;\n"
                }else{
                    respC+= "const " + vetAtributos[i] + " = document.getElementById(\"input"+ vetAtributos[i] +"\").value;\n"
                }

            }
            return respC
        }            
        
        function criarparametrosEE(vetAtributos, vetTipos){
            //if (matricula && endereco && bairro)
            // Filtra apenas atributos cujo tipo NÃO é boolean
            let filtrados = [];
            for (let i = 0; i < vetAtributos.length; i++) {
                if (vetTipos[i] !== "boolean") {
                    filtrados.push(vetAtributos[i]);
                }
            }

            // Junta tudo com " && "
            return filtrados.join(" && ");
        }

        function criarparametros(vetAtributos){
            //matricula, endereco, bairro
            let respP = ""
            for(let i=0; i<vetAtributos.length; i++){
                if (i < vetAtributos.length - 1) {
                    respP += vetAtributos[i] + " , ";
                } else {
                    respP += vetAtributos[i];
                }
            }
            return respP
        }

        function criarLista(vetAtributos, vetTipos){
            //        "linha.matricula + \" - \" +\n"+
            //        "linha.endereco + \" - \" +\n"+
            //        "linha.bairro + \" - \" +\n"+
            //        "linha.data + \"<br>\";\n"+
            //         linha.alugado?"sim":"nao" + " - " +      (BOOLEAN)
            let lista=""
            for(let i=0; i<vetAtributos.length; i++){
                // Se NÃO for o último atributo
                if(vetTipos[i]=="boolean"){
                    lista += "((linha." + vetAtributos[i] + ") ?\"sim\":\"não\") + \" - \" +\n"
                } else if (i < vetAtributos.length - 1) {
                    lista += "linha." + vetAtributos[i] + " + \" - \" +\n"
                } else {
                // Último atributo
                    lista += "linha." + vetAtributos[i] + " + \"<br>\";\n"
                }
                }
                return lista
        }

        function mostrarDados(nomeClasse, vetAtributos, vetTipos){
            //"document.getElementById(\"inputMatricula\").value = imovel.matricula;\n"+
            //"document.getElementById(\"inputEndereco\").value = imovel.endereco;\n"+
            let dados=""
            for(let i=0; i<vetAtributos.length; i++){
                if(vetTipos[i]=="boolean"){
                    dados+= "document.getElementById(\"input" + vetAtributos[i] +"\").checked = "+ nomeClasse +"."+ vetAtributos[i] +";\n"
                }else{
                    dados+= "document.getElementById(\"input" + vetAtributos[i] +"\").value = "+ nomeClasse +"."+ vetAtributos[i] +";\n" 
                }
            }
            return dados
        }

        function limpar(vetAtributos, vetTipos){
            //"document.getElementById(\"inputEndereco\").value = \"\";\n"+
            //"document.getElementById(\"inputBairro\").value = \"\";\n"+
            //.checked = false
            let limpar=""
            for(let i=1; i<vetAtributos.length; i++){
                if(vetTipos[i]=="boolean"){
                    limpar+= "document.getElementById(\"input"+ vetAtributos[i] +"\").checked = false;\n"
                }else{
                    limpar+= "document.getElementById(\"input"+ vetAtributos[i] +"\").value = \"\";\n"
                }
            }
            return limpar
        }

        function bloquear(vetAtributos){
            //"document.getElementById(\"inputMatricula\").readOnly = !soLeitura;\n"+
            //"document.getElementById(\"inputEndereco\").readOnly = soLeitura;\n"+
            let bloquear=""
            for(let i=1; i<vetAtributos.length; i++){
                bloquear+= "document.getElementById(\"input"+ vetAtributos[i] +"\").readOnly = soLeitura;\n"
            }
            return bloquear
        }

        function texto(vetAtributos){
            //linha.matricula + ";" +
            //linha.endereco + ";" +
            //linha.data
            resp=""
            for(let i=0; i<vetAtributos.length; i++){
                if(i <  vetAtributos.length-1){
                    resp+= "linha."+ vetAtributos[i] + " + " + "\"; \"" + " + \n"
                }else{
                    resp+= "linha." + vetAtributos[i]
                }
            }
            return resp
        }

        function lista(vetAtributos){
            //matricula: dados[0],
            //data: dados[7]
            let resplista=""
            for(let i=0; i<vetAtributos.length; i++){
                if(i <  vetAtributos.length-1){
                    resplista+= vetAtributos[i] +": dados["+ i +"], \n" 
                }else{
                    resplista+= vetAtributos[i] +": dados["+ i +"] "
                }
            }
            return resplista
        }
