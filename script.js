// javascript code goes here
let btn = document.getElementById("start");
let resetbtn = document.getElementById("reset");
let timerId;
let box = document.getElementsByClassName("square");
let divs = document.querySelectorAll(".square");
let time = document.getElementById("time-left");
let leftTimeId;
let music = document.getElementById("music");
const element = document.getElementById("level");
let moleTimer=750;


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
            clickBGMusic.play();
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
            gameBGMusic.pause();
            gameOverBG.play();
            stop();
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
    launchPageBG.pause();
    gameBGMusic.play();
});

let clickBGMusic = new Audio("pixel-death-66829.mp3");

let launchPageBG = new Audio("space_line-27593.mp3");
window.addEventListener("load",()=>{
    launchPageBG.play();
    music.innerText = "Mute";
});
let gameOverBG = new Audio("videogame-death-sound-43894.mp3");
// let gameOverAfterClick = new Audio("failure-drum-sound-effect-2-7184.mp3");
music.addEventListener("click",()=>{
    launchPageBG.pause();
})