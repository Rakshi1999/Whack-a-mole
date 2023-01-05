// javascript code goes here
const btn = document.getElementById("start");
const resetbtn = document.getElementById("reset");
let timerId;
const box = document.getElementsByClassName("square");
const divs = document.querySelectorAll(".square");
const time = document.getElementById("time-left");
let leftTimeId;
let music = document.getElementById("music");
const element = document.getElementById("level");
const table = document.getElementById("scoreTable");
let moleTimer=750;
let sl=0;
let clickBGMusic = new Audio("pixel-death-66829.mp3");
let gameOverBG = new Audio("videogame-death-sound-43894.mp3");
let muted = false;

function modeHandler(){
   if(element.value ==="medium"){
    moleTimer=575;
   }else if(element.value === "hard"){
    moleTimer=350;
   }else{
    moleTimer=750;
   }
}

divs.forEach((div)=>{
    div.addEventListener("click",()=>{click(div)});
});

function click(div){
        let elem = document.getElementById(`${div.id}`);
        let bool = elem.classList.contains("mole");
        console.log(bool);
        if(bool){
            console.log(parseInt(time.innerText));
            if(parseInt(time.innerText)<=0){
                alert("gaveOver");
            }else{
            let val = document.getElementById("score");
            let final = (parseInt(val.innerText))+1;
            val.innerText=final;
            if(!muted){
             clickBGMusic.play();
            }
            }
        }
}

function changeMole(){
    for(let i=0;i<box.length;i++){
        box[i].classList.remove("mole");
    }
    let random = Math.floor(Math.random()*9);
    box[random].classList.add("mole");
}

function stop(){
    clearInterval(timerId);
    clearInterval(leftTimeId);
}

btn.onclick=()=>{
    btn.setAttribute("disabled",true);
    element.setAttribute("disabled",true);
    timerId = setInterval(changeMole,moleTimer);
    leftTimeId = setInterval(()=>{
        let initial = time.innerText;
        let final = parseInt(initial) - 1;
        if(final<=5){
            time.style.color="red";
        }
        if(final<=0){
            if(!muted){
                gameBGMusic.pause();
                gameOverBG.play();
            }
            stop();
            addScore();
        }
        time.innerText = final;
    },1000)
}
resetbtn.onclick=()=>{
    clearInterval(timerId);
    for(let i=0;i<box.length;i++){
        box[i].classList.remove("mole");
    }
    clearInterval(leftTimeId);
    time.innerText=42;
    time.style.color="black";
    document.getElementById("score").innerText = 0;
    btn.removeAttribute("disabled");
    element.removeAttribute("disabled");
}


let gameBGMusic = new Audio("8bit-music-for-game-68698.mp3");
btn.addEventListener("click",()=>{
    if(!muted){
        gameBGMusic.play();
    }
});

music.addEventListener("click",()=>{
   muted = true;
   gameBGMusic.pause();
   gameOverBG.pause();
})

function addScore(){
    let points = document.getElementById("score");
    let temp =`
    <tr>
       <td>${++sl}</td>
       <td>${points.innerText}</td>
    </tr>
    `
    table.innerHTML += temp;
}

