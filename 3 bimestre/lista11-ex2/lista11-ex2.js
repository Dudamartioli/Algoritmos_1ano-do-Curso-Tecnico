        let matriz = [];
        let linhas = 0;
        let colunas = 0;
        let linha = 0;
        let coluna = 0;
        let posAtual = 0;

        function iniciar() {
            linhas = 3
            colunas = 4

            matriz = [];
            for (let i = 0; i < linhas; i++) {
                let linha = [];
                for (let j = 0; j < colunas; j++) {
                    linha.push(0); // Inicializa com zero
                }
                matriz.push(linha);
            }

            posAtual = 0;

            atualizarSaida();
            document.getElementById("inputn").focus();
        }

        function fadd() {
            if (posAtual >= linhas * colunas) {
                alert("A matriz já está completa.");
                return;
            }

            let input = document.getElementById("inputn");
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
            document.getElementById("resp").innerText = texto;
        }

        function fsomarcoluna(){
            let soma1=0
            let soma2=0
            let soma3=0
            let soma4=0
            for(let i=0; i<matriz.length; i++){
                soma1+= matriz[i][0]
                soma2+= matriz[i][1]
                soma3+= matriz[i][2]
                soma4+= matriz[i][3]
            }
            document.getElementById("respsoma").innerHTML= "Coluna 1 = " + soma1 + " <br> Coluna 2 = " + soma2
            + " <br> Coluna 3 = " + soma3 + "<br> Coluna 4 = " + soma4
        }

        function fmedia(){
            let s1=0; let s2=0; let s3=0;
            for(let j=0; j<matriz[0].length; j++){
                s1+= matriz[0][j]
                s2+= matriz[1][j]
                s3+= matriz[2][j]
            }
            let m1= s1/matriz[0].length
            let m2= s2/matriz[0].length
            let m3= s3/matriz[0].length

            document.getElementById("respmedia").innerHTML = "Média da linha 1 = " + m1 + "<br> Média linha 2 = " + m2 + "<br> Média linha 3 = " + m3
            
        }