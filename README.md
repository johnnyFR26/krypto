A criptografia só aceita letras como entrada e senha.

Cada letra do texto que irá ser criptografado, sera transformado em A1Z26, e sera utilizado como a determinante de uma matriz.
EX: A = det(1), B = det(2), ..., Z = det(26).

A senha sera condizente ao tamanho da matriz que será gerada.
EX: A = 1x1, B = 2x2, ..., Z = 26x26.

Então se juntar os dois, irá criar o texto criptografado.
EX: texto = "A" e senha "B", será gerado uma matriz 2x2 onde a determinante será igual a 1.

Essa criptografia tem uma semelhança com a de vigenère, onde quando a senha acabar, ela volta para o começo.
EX: texto = "abacaxi" e senha "oi", será gerada então 7 matrizes(quantidade de letras que o texto tem) onde elas serão: 15x15, 9x9, 15x15, 9x9, 15x15, 9x9, 15x15.

Na descriptografia nós utilizaremos a senha para saber o tamanho da matriz e utilizar a fórmula do método de montante para transformar em determinantes, assim, podendo transformar em letras de volta.
