if(!localStorage.getItem('timer')){
    localStorage.setItem('timer', 600);
}

let tempo = localStorage.getItem('timer');
let timer = document.getElementById("timer")
timeFormat(tempo);

let countdown = setInterval(() => {
    if(tempo > 0){
        tempo--;
        localStorage.setItem('timer', tempo);
        timeFormat(tempo);
    } else {
        clearInterval(countdown)
    }
},1000)

function timeFormat(time) {
    let minutes = Math.floor(time / 60)
    let seconds = time % 60
    let minute = minutes < 10 ? `0${minutes}` : minutes; 
    let second = seconds < 10 ? `0${seconds}` : seconds; 
    timer.innerText = minute + ":" + second;
}