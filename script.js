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
let level = "Easy";

anime.timeline({loop: false})
  .add({
    targets: '.ml15 .word',
    scale: [10,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 3500,
    delay: (el,i) => 800 * i
})



window.addEventListener("load",()=>{
    music.innerText = "Mute";
})

function modeHandler(){
   if(element.value ==="medium"){
    moleTimer=575;
    level="Medium";
   }else if(element.value === "hard"){
    moleTimer=350;
    level="Hard";
   }else{
    moleTimer=750;
    level="Easy";
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
    let topScore =JSON.parse(localStorage.getItem("userScoreLocal"));

    if(topScore){
        arr.forEach((obj)=>{
            if(obj.userLevel==="Hard"){
                if(topScore.Hlevel<obj.userPoints){
                    topScore.Hlevel = obj.userPoints;
                    document.getElementById("local-hard-score").innerText=topScore.Hlevel;
                }
            }else if(obj.userLevel==="Medium"){
                if(topScore.Mlevel<obj.userPoints){
                    topScore.Mlevel = obj.userPoints;
                    document.getElementById("local-medium-score").innerText=topScore.Mlevel;
                }
            }else{
                if(topScore.Elevel<obj.userPoints){
                    topScore.Elevel = obj.userPoints;
                    document.getElementById("local-easy-score").innerText=topScore.Elevel;
                }
            }
        })

        localStorage.setItem("userScoreLocal",JSON.stringify(topScore));

    }else{
        let tempObj = {
            Hlevel:0,
            Mlevel:0,
            Elevel:0,
        };
        arr.forEach((obj)=>{
            if(obj.userLevel==="Hard"){
                tempObj.Hlevel = obj.userPoints;
            }else if(obj.userLevel==="Medium"){
                tempObj.Mlevel = obj.userPoints;
            }else{
                tempObj.Elevel = obj.userPoints;
            }
        })
        localStorage.setItem("userScoreLocal",JSON.stringify(tempObj));
        document.getElementById("local-hard-score").innerText=tempObj.Hlevel;
        document.getElementById("local-medium-score").innerText=tempObj.Mlevel;
        document.getElementById("local-easy-score").innerText=tempObj.Elevel;
    }
}

function addScore(){
    let points = document.getElementById("score").innerText;
    let obj = {
        userPoints: Number.parseInt(points),
        userLevel:level,
    }
    scoreArray.push(obj);
    scoreArray.sort(function(a, b){return b.userPoints - a.userPoints});
    console.log(scoreArray);
    storeTheScore(scoreArray);
    table.innerHTML = `
          <tr>
            <th>Rank</th>
            <th>Score</th>
            <th>Level</th>
         </tr>
    `
    scoreArray.forEach((obj,index)=>{
     let temp =`
        <tr>
          <td>${index+1}</td>
          <td>${obj.userPoints}</td>
          <td>${obj.userLevel}</td>
        </tr>
        `
        table.innerHTML+=temp;
    })
}

window.addEventListener("load",()=>{
    let localScore = JSON.parse(localStorage.getItem("userScoreLocal"));
    if(localScore){
        document.getElementById("local-hard-score").innerText=localScore.Hlevel;
        document.getElementById("local-medium-score").innerText=localScore.Mlevel;
        document.getElementById("local-easy-score").innerText=localScore.Elevel;
    }else{
        document.getElementById("local-hard-score").innerText=0;
        document.getElementById("local-medium-score").innerText=0;
        document.getElementById("local-easy-score").innerText=0;
    }
})