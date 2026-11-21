let codigoFonte = "";

        function gerarClasse() {
            debugger
            let nomeClasse = document.getElementById("inputNomeClasse").value;
            //nomeClasse = primeiraLetraMaiuscula(nomeClasse)
            let atributos = document.getElementById("inputAtributos").value;

            let vetAtributos = atributos.split(",");

            codigoFonte = "class Classe" + nomeClasse + "{" + "\n";

            codigoFonte += "   constructor (" + atributos + ",posicaoNaLista" + ")" + "{\n";

            for (let i = 0; i < vetAtributos.length; i++) {
                const at = vetAtributos[i];
                codigoFonte += "          this." + at + " = " + at + ";\n";
            }
            codigoFonte += "          this.posicaoNaLista = posicaoNaLista;\n"
            codigoFonte += "   }\n}\n";

            //console.log(codigoFonte);
            document.getElementById("taCodigoFonte").textContent = codigoFonte;
        }

        //function primeiraLetraMaiuscula(palavra){
        //    return palavra[0].toUpperCase()+palavra.substring(1,palavra.length).toLowerCase();
        //}