// javascript code goes here
const btn = document.getElementById("start");
const resetbtn = document.getElementById("reset");
const divs = document.querySelectorAll(".square");
const time = document.getElementById("time-left");
const music = document.getElementById("music");
const element = document.getElementById("level");
const table = document.getElementById("scoreTable");
const clickBGMusic = new Audio("pixel-death-66829.mp3");
const gameOverBG = new Audio("videogame-death-sound-43894.mp3");
const scoreArray = [];
let muted = false;
let timerId;
let leftTimeId;
let moleTimer=750;
let sl=0;

window.addEventListener("load",()=>{
    music.innerText = "Mute";
})

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
        // console.log(bool);
        if(bool){
            // console.log(parseInt(time.innerText));
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
    divs.forEach((div)=>{
        div.classList.remove("mole")
    });
    let random = Math.floor(Math.random()*9);
    divs[random].classList.add("mole");
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
        if(final<=10){
            time.style.color="red";
        }
        if(final==0){
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
    for(let i=0;i<divs.length;i++){
        divs[i].classList.remove("mole");
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
    if(!muted){
       muted = true;
       gameBGMusic.pause();
       gameOverBG.pause();
       music.innerText="Un-Mute";
       music.style.backgroundColor = "rgba(93, 147, 209,0.2)";
    }else{
        muted = false;
        music.innerText="Mute";
        music.style.backgroundColor = "rgba(93, 147, 209,1)";   
    }
})

function storeTheScore(arr){
    let topScore =JSON.parse(localStorage.getItem("score"));
    if(topScore){
        if(topScore<arr[0]){
            localStorage.setItem("score",JSON.stringify(arr[0]));
            document.getElementById("local-score").innerText=arr[0];
        }
    }else{
        localStorage.setItem("score",JSON.stringify(arr[0]));
    }
}

function addScore(){
    let points = document.getElementById("score");
    scoreArray.push(Number.parseInt(points.innerText));
    scoreArray.sort(function(a, b){return b - a});
    console.log(scoreArray);
    storeTheScore(scoreArray);
    table.innerHTML = `
          <tr>
            <th>sl</th>
            <th>Score</th>
         </tr>
    `
    scoreArray.forEach((ele,index)=>{
     let temp =`
        <tr>
          <td>${index+1}</td>
          <td>${ele}</td>
        </tr>
        `
        table.innerHTML+=temp;
    })
}

window.addEventListener("load",()=>{
    let localScore = JSON.parse(localStorage.getItem("score"));
    if(localScore){
        document.getElementById("local-score").innerText=localScore;
    }
})

