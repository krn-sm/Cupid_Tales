const startBtn = document.getElementById("startBtn");

const startPage =
document.getElementById("startPage");

const puzzlePage =
document.getElementById("puzzlePage");

const cluePage =
document.getElementById("cluePage");

const container =
document.getElementById("puzzle-container");

const timerText =
document.getElementById("time");


let selected=null;
let pieces=[];
let timer;

const grid=3;
let timeLeft=60;



/* PAGE SWITCH */

function show(page){

document
.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));

page.classList.add("active");

}


/* START */

startBtn.onclick=()=>{

show(puzzlePage);

createPuzzle();
startTimer();

};



/* TIMER */

function startTimer(){

clearInterval(timer);

timeLeft=60;

timer=setInterval(()=>{

timeLeft--;
timerText.textContent=timeLeft;

if(timeLeft<=0){

location.reload();

}

},1000);

}



/* PUZZLE */

function createPuzzle(){

container.innerHTML="";
pieces=[];

let order=
[...Array(9).keys()]
.sort(()=>Math.random()-0.5);

order.forEach((pos,i)=>{

let piece=document.createElement("div");

piece.className="piece";

piece.dataset.correct=i;
piece.dataset.current=pos;

piece.style.backgroundImage=
"url('cupid-map.png')";

piece.style.backgroundSize="300% 300%";

let x=(pos%3)*50;
let y=Math.floor(pos/3)*50;

piece.style.backgroundPosition=
`${x}% ${y}%`;

piece.onclick=()=>selectPiece(piece);

pieces.push(piece);
container.appendChild(piece);

});

}



/* SELECT */

function selectPiece(p){

if(!selected){

selected=p;
p.classList.add("selected");

return;
}

swap(selected,p);

selected.classList.remove("selected");
selected=null;

checkWin();

}



function swap(a,b){

let bg=a.style.backgroundPosition;
let data=a.dataset.current;

a.style.backgroundPosition=
b.style.backgroundPosition;

a.dataset.current=b.dataset.current;

b.style.backgroundPosition=bg;
b.dataset.current=data;

}



/* WIN */

function checkWin(){

let solved=
pieces.every(
(p,i)=>p.dataset.current==i
);

if(solved){

clearInterval(timer);

/* smooth delay */
setTimeout(()=>{

show(cluePage);

},900);

}

}