apagar();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function apagar() {
    let elements = document.getElementsByClassName('title');
    let texts = [];
    for(let element of elements){
        texts.push(element.innerText)
        element.innerText = "";
    }
    letrinha(elements, texts);
}

async function letrinha(elements, texts) {
    let i = 0;
    for(let text of elements){
        let texto = texts[i];
        for(let i = 0; i < texto.length; i++){
            let numLetra = 0;
            if(texto.charAt(i).toUpperCase() === texto.charAt(i)){
                numLetra = 65;
            }
            else{
                numLetra = 97;
            }

            while(numLetra != texto.charCodeAt(i)){
                numLetra++
                text.innerText = text.innerText.slice(0, i) + String.fromCharCode(numLetra)
                await sleep(10);
            }
            text.innerText = text.innerText.slice(0, i) + String.fromCharCode(numLetra)
        }
        i++;
    }

}