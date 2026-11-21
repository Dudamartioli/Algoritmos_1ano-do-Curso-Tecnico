function gerarHTML() {
            debugger
            codigoFonte = ""
            nomeClasse = document.getElementById("inputNomeClasse").value

            let tipos = (document.getElementById("inputTipos").value).toLowerCase()
            let vetTipos = tipos.split(";")
            
            let atributos = document.getElementById("inputAtributos").value;
            let vetAtributos = atributos.split(",");
            let input = "input" + vetAtributos[0]


            codigoFonte = 
                "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>CRUD " + nomeClasse + "</title>\n" +
                "</head>\n" +
                "\n" +
                    "<body   style=\"background-color: mediumpurple;\">\n\n" +

                "<h1  style=\"color: rgb(241, 238, 237);\">" + nomeClasse + "</h1>\n" +

               "<label for=\"" + input + "\"  style=\"color: rgb(241, 238, 237);\">" + vetAtributos[0] + "</label>\n" + 
               "<input type=\"" + mudarTipos(vetTipos[0]) + "\" name=\"" + vetAtributos[0] + "\" id=\"" + input +"\"  style=\"background-color: rgb(235, 215, 250);\">\n" +
               "<input type=\"button\" value=\"Procure\" id=\"btProcure\" onclick=\"procure()\" style=\"display:inline;\" style=\"background-color: rgb(152, 95, 206); color: rgb(241, 238, 237);\" >\n"+
               "<input type=\"button\" value=\"Inserir\" id=\"btInserir\" onclick=\"inserir()\" style=\"display:none;\"  style=\"background-color: rgb(152, 95, 206); color: rgb(241, 238, 237);\">\n"+
               "<input type=\"button\" value=\"Alterar\" id=\"btAlterar\" onclick=\"alterar()\" style=\"display:none;\"  style=\"background-color: rgb(152, 95, 206); color: rgb(241, 238, 237);\">\n"+
               "<input type=\"button\" value=\"Excluir\" id=\"btExcluir\" onclick=\"excluir()\" style=\"display:none;\"  style=\"background-color: rgb(152, 95, 206); color: rgb(241, 238, 237);\">\n"+
               "<br><br>\n\n" +

               novosAtributos(vetAtributos, vetTipos) +

               "<br><br>\n\n" +
               "<div id=\"divAviso\" style=\"color: rgb(241, 238, 237);\"></div>\n" +
               "<br>" +
               "<input type=\"button\" value=\"Salvar\" id=\"btSalvar\" onclick=\"salvar()\" style=\"display:none;\"  style=\"background-color: rgb(152, 95, 206); color: rgb(241, 238, 237);\">\n" +
               "<input type=\"button\" value=\"Cancelar\" id=\"btCancelar\" onclick=\"cancelarOperacao()\" style=\"display:none;\"  style=\"background-color: rgb(152, 95, 206); color: rgb(241, 238, 237);\">\n" +
               "<br><br>\n\n" +

               "<div id=\"outputSaida\" style=\"background-color: rgb(235, 215, 250);\">...</div>\n" +

               "<input type=\"button\" value=\"Persistir\" id=\"btPersisitir\" onclick=\"prepararESalvarCSV()\"  style=\"background-color: rgb(152, 95, 206); color: rgb(241, 238, 237);\">\n" +
               "<input type=\"button\" value=\"Recuperar\" id=\"btRecuperar\" onclick=\"abrirArquivoSalvoEmLocalPermanente()\"  style=\"background-color: rgb(152, 95, 206); color: rgb(241, 238, 237);\">\n"

            document.getElementById("taCodigoFonte").textContent = codigoFonte +
                    "</body>\n" +
                    "<script src=\"./" + nomeClasse + ".js\"></script>\n" +
                    "<script src=\"./" + nomeClasse + "Controle.js\"></script>\n" +
                    "</html>";
        }


        function novosAtributos(vetAtributos, vetTipos){
            let html = ""
            for(let i=1; i<vetAtributos.length; i++){
                html+=  "<label for=\"" + "input" + vetAtributos[i] + "\" style=\"color: rgb(241, 238, 237);\">" + vetAtributos[i] + "</label>\n" +
                        "<input type=\"" + mudarTipos(vetTipos[i]) + "\" name=\"" + "input" + vetAtributos[i] + "\" id=\"" + "input" + vetAtributos[i] + "\" style=\"background-color: rgb(235, 215, 250);\">\n" +
                        "<br>\n\n"
            }
            return html
        }

        function mudarTipos(vetor){
            let input = ""
            if(vetor=="int" || vetor=="float"){
                input = "number"
            } else if(vetor=="text" || vetor=="string"){
                input = "text"
            } else if(vetor=="boolean"){
                input = "checkbox"
            } else{
                input = vetor
            }
            return input

            //<label for="inputAvaliacao">Avaliação (0 a 10)</label>
            //<select id="inputAvaliacao">
            //    <option value="">-- Selecione uma opção --</option>
            //    <option value="1">1</option>
            //    <option value="2">2</option>
            //    <option value="3">3</option>
            //    <option value="4">4</option>
            //    <option value="5">5</option>
            //</select>

            //<label for="inputCategoria">Categoria</label>
            //<input !!!list="categorias" id="inputCategoria" name="inputCategoria" placeholder="Ex: Cadernos">
            //<datalist id="categorias">
            //    <option value="Caderno">
            //    <option value="Caneta">
            //    <option value="Lápis">
            //    <option value="Borracha">
            //</datalist> PODE SELECIONAR A OPÇAO Q NÃO É SUGERIDA

            //Function BLOQUEARATRIBUTOS(){
            //  document.getElementeById("inputAvaliacao").DISABLED = soLeitura
            //}
        }

       //FIM HTML!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
