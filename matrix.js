const canvas = document.getElementById("matrixCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');

const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\|{}<>[]^~`;

window.addEventListener("resize", () =>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    con
});
class letter{
    letter = chars.split('')[Math.floor(Math.random()*chars.length)];
    color = '#fff';
    start = 0;
    waveEffect = async (font, w, i, timestamp) => {
        if (this.start == 0) {
            this.start = timestamp;
        }
        const progresso = (timestamp - this.start) / 2000;
        ctx.fillStyle = `rgba(1, 3, 23,${progresso})`;
        ctx.fillRect(w - font / 2, i * font, font * 1.2, font * 1.2);
        
        
            if (progresso > 0.02) {
                this.color = `rgba(12, 183, 50,${1 - progresso})`;
            }

            ctx.font = font + "px MatrixCode";
            ctx.fillStyle = this.color; 
            ctx.textAlign = "center";
            ctx.fillText(this.letter, w, (i + 1) * font);

        if(progresso < 1){
            
            requestAnimationFrame((timestamp) => {
                this.waveEffect(font, w, i, timestamp);
            });
        }
    }
}

class line {
    size = Math.ceil(Math.random() * 20) + 15;
    letterAmount = Math.ceil(Math.random() * 30) + 5;
    letters = [];
    w = Math.ceil(Math.random() * (canvas.width - this.size) + this.size/2)
    constructor() {
        for (let i = 0; i < this.letterAmount; i++) {
            this.letters.push(new letter);
        }
    }

    
    rain = async () => {
        for(let i = 0; i < this.letterAmount ; i++){
            requestAnimationFrame((timestamp) => {
                this.letters[i].waveEffect(this.size, this.w, i, timestamp);
            });
            await sleep(40);
        }
        linhas.pop();
    }
}

let linhas = [];
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function criarLinha(){
    linhas.unshift(new line);
    linhas[0].rain(ctx);
    await sleep(Math.ceil(Math.random() * 20) + 10);
    criarLinha();
}

criarLinha();
