        let matriz = [];
        let linhas = 0;
        let colunas = 0;
        let linha = 0;
        let coluna = 0;
        let posAtual = 0;

        function iniciarMatriz() {
            linhas = parseInt(document.getElementById("inputLinhas").value);
            colunas = parseInt(document.getElementById("inputColunas").value);

            
            for (let i = 0; i < linhas; i++) {
                let linha = [];
                for (let j = 0; j < colunas; j++) {
                    linha.push(0); // Inicializa com zero
                }
                matriz.push(linha);
            }

            // Habilita os campos
            document.getElementById("inputNumero").disabled = false;
            document.getElementById("btnAdicionar").disabled = false;

            atualizarSaida();
            document.getElementById("inputNumero").focus();
        }

        function adicionarNumero() {
            if (posAtual >= linhas * colunas) {
                alert("A matriz já está completa.");
                return;
            }

            let input = document.getElementById("inputNumero");
            let valor = parseFloat(input.value);

            matriz[linha][coluna] = valor;

            if(coluna<colunas-1) {
                coluna++;
            } else {
                coluna = 0;
                linha++;
            }
            posAtual++;



            atualizarSaida();

            input.value = "";
            input.focus();

            if (posAtual >= linhas * colunas) {
                input.disabled = true;
                document.getElementById("btnAdicionar").disabled = true;
            }
        }

        function atualizarSaida() {
            let texto = "";
            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[i].length; j++) {
                    let valor = matriz[i][j];
                    if (valor === "") {
                        texto += "_";
                    } else {
                        texto += valor;
                    }
                    texto += " ";
                }
                texto += "\n";
            }
            document.getElementById("saidaMatriz").innerText = texto;
        }

        function somar(){
            let soma = 0
            for(let i=0; i<matriz.length; i++){
                for(let j=0; j<matriz[0].length; j++){
                    soma += matriz[i][j]
                }
            }
            document.getElementById("respsoma").innerHTML= "= " + soma
        }

        function somarcoluna(){
            let soma = 0
            coluna= parseInt(document.getElementById("ncoluna").value)
            for(let i=0; i<matriz.length; i++){
                soma+= matriz[i][coluna]
            }
            document.getElementById("respcoluna").innerHTML= "= " + soma
        }

        function fmedialinha(){
            let soma = 0
            let linha = parseInt(document.getElementById("inputlinha").value)
            for(let j=0; j<matriz.length; j++){
                soma+=matriz[linha][j]
            }
            let media=soma/matriz[linha].length
            document.getElementById("resplinha").innerHTML= "= " + media
        }

        function fpares(){
            let pares = []
            for(let i=0; i<matriz.length; i++){
                for(let j=0; j<matriz[i].length; j++){
                    if(matriz[i][j]%2==0){ //par
                        pares.push(matriz[i][j])
                    }
                }
            }
            document.getElementById("resppar").innerHTML= "= " + pares
        }

        function fprimos(){
            debugger
            let n=0
            let resp=0
            for(let i=0; i<matriz.length; i++){
                for(let j=0; j<matriz[i].length; j++){
                    n=matriz[i][j]

                    if(ehprimo(n)){
                       resp+=1
                    }
                }
            }
            document.getElementById("respprimos").innerHTML= "Existem " + resp + " números primos"
        }

        function ehprimo(n){
            let cont=0
            for(let i=1; i<=n; i++){
                if(n%i==0){
                    cont++
                }
            }
            if(cont==2){
                return true
            } else{
                return false
            }
        }

        function fposicao(){
            let maior=matriz[0][0]
            let l=0
            let c=0
            for(let i=0; i<matriz.length; i++){
                for(let j=0; j<matriz[i].length; j++){
                    if(maior<matriz[i][j]){
                        maior=matriz[i][j]
                        l=i
                        c=j
                    }
                }
            }
            document.getElementById("respposicao").innerHTML= maior + " é o maior, na linha " + l + " e coluna " + c
        }

        function fmultiplicacao(){
            let l1=parseInt(document.getElementById("n1linha").value)
            let l2=parseInt(document.getElementById("n2linha").value)
            let c1=parseInt(document.getElementById("n1coluna").value)
            let c2=parseInt(document.getElementById("n2coluna").value)

            let multiplicacao= matriz[l1][c1] * matriz[l2][c2]

            document.getElementById("respmultiplicacao").innerHTML= matriz[l1][c1] + "x" + matriz[l2][c2] + " = " + multiplicacao
        }

        function fseparar(){
            let pares=[]
            let impares=[]
            for(let i=0; i<matriz.length; i++){
                for(let j=0; j<matriz[i].length; j++){
                if(matriz[i][j]%2==0){
                    pares.push(matriz[i][j])
                }else{
                    impares.push(matriz[i][j])
                }
               }
            }
            document.getElementById("respseparado").innerHTML= "<br> Pares: " + pares + "<br>" + "Impares: " + impares
        }

        function fprocurar(){
            let n=parseInt(document.getElementById("inputn").value)
            let resp="Esse número NÃO está na matriz"
            for(let i=0; i<matriz.length; i++){
                for(let j=0; j<matriz[i].length; j++){
                    if(n==matriz[i][j]){
                        resp="Esse número está na matriz"
                    }
                    }
                }
            
            document.getElementById("respn").innerHTML= resp
        }

        function fcontar(){
            let n=parseInt(document.getElementById("inputn2").value)
            let cont=0
            for(let i=0; i<matriz.length; i++){
                for(let j=0; j<matriz[i].length; j++){
                    if(n==matriz[i][j]){
                        cont++
                    }
                }
            }
            document.getElementById("respn2").innerHTML= "O número " + n + " está " + cont + " vezes na matriz"
         }