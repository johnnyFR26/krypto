let decoded = document.getElementById("decoded"); //Pega o texto padrão
//Quando inserido qualquer valor, o campo irá automaticamente remover qualquer caractere que não for de A até a Z (tanto minusculo quanto maiusculo)
decoded.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z\s]/g,"");
});

let coded = document.getElementById("coded"); //Pega o texto criptografado
//Quando inserido qualquer valor, o campo irá automaticamente remover qualquer caractere que não for numerais, ',' ou '-'
coded.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9\s,-]/g,"");
});

let senha = document.getElementById("senha"); //Pega a senha
//Quando inserido qualquer valor, o campo irá automaticamente remover qualquer caractere que não for de A até a Z (tanto minusculo quanto maiusculo)
senha.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z\s]/g,"");
});

//Função que criptografa o código
function code() {
    let pass = senha.value.replace(/[\s]/g,"").toLowerCase(); //pega a senha e tira os espaços que tem nela e transforma em minúsculo
    //verifica se houve alguma senha, se não tiver nada, ele manda um alerta avisando que é para colocar a senha e retorna
    if(pass == ''){
        alert('É necessário colocar a senha!');
        return;
    }

    //cria um array que irá pegar o valor numérico de cada letra da senha como no A1Z26
    let passes = [];

    for(let i = 0; i < pass.length; i++){
        let numLetra = pass.charCodeAt(i) - 96;
        passes.push(numLetra);
    }
    let texto = decoded.value.toLowerCase(); //transforma o texto em minusculo
    let newText = ""; //cria o texto de saída
    for(let i = 0; i < texto.length; i++){ //pega cada letra pra transformar em matriz
        let numLetra = texto.charCodeAt(i) - 96; //pega o código ASCII da letra e diminui 96 para ficar igual o A1Z26
        
        //se não for uma letra, que no caso a única coisa que pode ser é o espaço, então o espaço é igual a 0;
        if(numLetra < 0){
            numLetra = 0;
        }
        //condiciona para ver se ta começando, caso contrário, ele irá colocar, no texto de saida, a virgula antes de chamar a função, de criar matriz a partir da letra, adicionando o resultado ao texto de saída
        if(i != 0){
            newText += ',' + matrizComDeterminanteK(numLetra, passes[i%passes.length], 4, 100);
        }else{
            newText = matrizComDeterminanteK(numLetra, passes[i%passes.length], 4, 100);
        }
        //atribui ao campo de texto criptografado o texto de saída
        coded.value = newText;
    }

}
let btCode = document.getElementById("btCode"); //Pega o botão de criptografar
btCode.addEventListener("click", code); //Quando o bortão é clicado inicia a função de ciptografia
/*
//função para transformar letra em matriz, recebe o número da letra e o número da senha;
function numToMatrix(num, pass) {
    let matrix = []; // cria matriz
    // define o tamanho do matriz a partir da senha
    for(let i = 0; i < pass; i++){
        matrix[i] = new Array();
    }
    let diagonal = [] // cria a diagonal da matriz
    
    for(let i = 1; i <= pass; i++){ // entra em um loop onde ele vai até o limite da matriz
        if(i + 1 > pass) {  // verifica se é o último passo e adiciona o número que sobrou
            diagonal.push(num)
        }
        else if(num % (i + 1) == 0){ // caso o numero seja divisivel pelo iterador + 1, ele divide o número, desse jeito espalhando a determinante pela diagonal
            diagonal.push(i + 1);
            num /= i + 1;
        }
        else{ // caso não seja divisível, ele apenas coloca 1 no lugar
            diagonal.push(1);
        }
        console.log(num);
    }
    
    diagonal.sort(() => {return 0.5 - Math.random()}); // organiza o array de uma forma aleatória

    //cria os valores do array
    for(let i = 0; i < pass; i++){
        for(let j = 0; j < pass; j++){
            if (i > j){ // atribui o valor 0 no triangulo de baixo da matrix para zerar o triangulo de cima da matriz, sobrando assim apenas a diagonal
                matrix[i][j] = 0;
            }
            else if (i < j){ // atribui valores aleatórios no triangulo de cima da matriz
                matrix[i][j] = Math.floor(Math.random()*20)-10;
            }
            else{ //atribui na diagonal da matriz a diagonal que tinhamos feito antes
                matrix[i][j] = diagonal[i];
            }
        }
    }
    let text = ""; // texto de saída
    // transcreve todas as linhas da matriz para string e colocando ',' entre cada linha
    for(let i = 0; i < matrix.length; i++){
        text+= matrix[i].toString();
        if(i + 1 != matrix.length){
            text+= ",";
        }
    }
    return text; // retorna a matriz como string
}
*/

//função de decodificar o texto criptografado
function decode() {
    let pass = senha.value.replace(/[\s]/g,"").toLowerCase(); //pega a senha e tira os espaços que tem nela e transforma em minúsculo
    //verifica se houve alguma senha, se não tiver nada, ele manda um alerta avisando que é para colocar a senha e retorna
    if(pass == ''){ 
        alert('É necessário colocar a senha!');
        return;
    }

    //cria um array que irá pegar o valor numérico de cada letra da senha como no A1Z26
    let passes = Array.from(pass).map(letter => letter.charCodeAt(0) - 96);



    let texto = coded.value.replace(/[\s]/g,""); // pega o texto criptografado e tira os espaços
    let numbers = texto.split(','); // pega cada número que tem no texto que estão separados por virgulas
    numbers = numbers.map(BigInt); // transforma o número que esta em string para um número Number;
    let answer = ""; // texto de saída

    let h = 0; //iterador que precede os iteradores das matrizes
    //enquanto tiver número ele irá continuar
    while(numbers.length != 0){
        let actualPass = passes[h%passes.length];
        let matrix = new Array(); //matriz recebida
        //define o tamanho do matriz a partir da senha
        //atribui os valores que estavam na criptografia em uma matriz e remove cada número adicionado do array
        for(let i = 0; i < actualPass; i++){
            matrix[i] = numbers.splice(0, actualPass);
        }
        let det = resolveMatrix(matrix); //chama a função
        //se a determinante da matriz for 0 ele espaço no final
        if(det == 0){
            answer+=" ";
        }
        //senão ele transforma o número do determinante em uma letra
        else {
            answer += String.fromCharCode(Number(det) + 96);
        }
        h++ //aumenta o iterador
    }
    decoded.value = answer; //atribui ao campo de texto normal o texto de saída
}
let btDecode = document.getElementById("btDecode"); // pega o botão de descriptografar
btDecode.addEventListener("click", decode); // atribui o evento de quando clicar, chamar a função de descriptografia
/* Teorema de Laplace método muito ineficiente
function matriz(matrix){
	if (matrix.length != 1){
	let det = 0;
		for(let ja = 0; ja < matrix.length; ja++){
			let miniMatrix = []
			for(let i = 0; i+1 < matrix.length; i++){
                miniMatrix[i] = new Array();
            }
			for(let i = 1; i < matrix.length; i++){
				for(let j = 0; j < matrix.length; j++){
					if(j == ja){
						j++;
					}
                    if(j < matrix.length){
                        miniMatrix[i-1].push(matrix[i][j])
                    }
				}
			}
		    det += matrix[0][ja] * Math.pow(-1,2+ja) * matriz(miniMatrix)
		}
        console.table(matrix)
        console.log(det)
		return det;
	}
	else {
		return matrix[0];
	}
}
*/

//função de calcular a determinante da matriz a partir do método de montante
function resolveMatrix(matrix){
    let newMatrix = bigger(matrix); // cria uma segunda matriz exatamente igual a recebida, porém não estão ligadas
    matrix = copiaMatriz(newMatrix)
    let P = 1n; // parte da fórmula
    for(let i = 0; i< matrix.length; i++){
        // um for passando por todas as linhas da matriz
        for(let i1 = 0; i1 < matrix.length; i1++){
            // se eles estiverem na mesma altura, ele passa o código,
            if(i1 == i){
                continue;
            }
            //se uma diagonal for igual a 0
            if(matrix[i][i] == 0n){
                //verifica se a linha inteira é formada de 0, caso seja, a determinante é 0
                let testZero1 = false;
                let testZero2 = false;
                for(let j = 0; j < matrix.length; j++){
                    if(matrix[i][j] != 0n){
                        testZero1 = true;
                    }
                }
                for(let i2 = i; i2 < matrix.length; i2++){
                    if(matrix[i2][i] != 0n){
                        testZero2 = true;
                    }
                }
                if(testZero1 == false || testZero2 == false){
                    return 0;
                }
                //senão, ele negativa a linha inteira e desce uma posição, dessa forma talvez na próxima vez a determinante não seja igual a 0, e continue a conta normalmente
                else{
                    let i2;
                    for(i2 = i; i2 < matrix.length; i2++){
                        if(matrix[i2][i] != 0n)
                        {
                            break;
                        }
                    }
                    matrix = trocarLinha(matrix, i, i2);
                    newMatrix = copiaMatriz(matrix);
                }
            }
            //ele altera os valores de cada elemento da linha atual de acordo com a fórmula do método de montante
            for(let j = 0; j < matrix.length; j++){
                newMatrix[i1][j] = (matrix[i1][j] * matrix[i][i] - matrix[i1][i] * matrix[i][j])/P;
            }
        }
        P = newMatrix[0][0]; // salva a diagonal anterior
        matrix = newMatrix.map(row => row.slice()) // atribui o valor da matriz nova na antiga
    }
    return Number(newMatrix[0][0]); //retorna a diagonal da matriz, que agora, é a determinante
}

function bigger(M){
    return M.map(row => row.map(n => BigInt(n)))
}

function trocarLinha(M, i, i2){
    temp = copiaMatriz(M)
    temp[i2] = M[i].map(n => -n)
    temp[i] = M[i2]
    return temp;
}

function identidade(n) {
  const I = [];
  for (let i = 0; i < n; i++) {
    const row = Array(n).fill(0);
    row[i] = 1;
    I.push(row);
  }
  return I;
}

// Função auxiliar: copia uma matriz
function copiaMatriz(M) {
  return M.map(row => [...row]);
}

// Multiplicação de matrizes A * B
function mult(A, B) {
  A = bigger(A)
  B = bigger(B)
  const n = A.length;
  const m = B[0].length;
  const p = B.length;
  const C = Array.from({ length: n }, () => Array(m).fill(0n));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < p; k++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return C;
}

// Função para gerar matriz unimodular aleatória (det = 1)
function randomUnimodular(n, ops = 10, maxCoeff = 5) {
  let U = identidade(n);
  ops = ops * n

  for (let opNum = 0; opNum < ops; opNum++) {
    const i = Math.floor(Math.random() * n);
    let j;
    do { j = Math.floor(Math.random() * n); } while (j === i);

    const op = Math.random() < 0.5 ? 'add' : 'swap';

    if (op === 'add') {
      const c = Math.floor(Math.random() * (2 * maxCoeff + 1)) - maxCoeff;
      if (c === 0) continue;
      for (let k = 0; k < n; k++) {
        U[i][k] += c * U[j][k];
      }
    } else { // swap
      U = trocarLinha(U, i, j)
    }
  }
  return U;
}

// Gera matriz com determinante exatamente igual a k
function matrizComDeterminanteK(k, n = 3, ops = 20, maxCoeff = 5, times = 0) {
  let D = identidade(n);
  if(n==1){return k}
  D[n-1][n-1] = k;
  
  const U = randomUnimodular(n, ops, maxCoeff);
  const V = randomUnimodular(n, ops, maxCoeff);
  
  let A = mult(mult(D, U), V);
  let detA = resolveMatrix(A);
  
  if (detA === k) return A;
    
    // Tenta corrigir reiniciando
    if(times < 10){
        console.log(times)
        return matrizComDeterminanteK(k,n,ops,maxCoeff,times+1);
    }
    
    // Fallback
    console.warn("Não conseguiu determinante exato, det =", detA);
    let text = ""; // texto de saída
    // transcreve todas as linhas da matriz para string e colocando ',' entre cada linha
    for(let i = 0; i < A.length; i++){
        text+= A[i].toString();
        if(i + 1 != A.length){
            text+= ",";
        }
    }
    return text;
}