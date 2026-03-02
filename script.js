const startBtn =
document.getElementById("startBtn");

const puzzlePage =
document.getElementById("puzzlePage");

const cluePage =
document.getElementById("cluePage");

const container =
document.getElementById("puzzle-container");

const timerText =
document.getElementById("time");

const bgMusic =
document.getElementById("bgMusic");

const winMusic =
document.getElementById("winMusic");

const arrow =
document.getElementById("arrow");

const enterBtn =
document.getElementById("enterBtn");

const passwordInput =
document.getElementById("startPassword");

const passMsg =
document.getElementById("passMsg");

const ACCESS_PASSWORD =
"martin scorsese";

let selected=null;
let pieces=[];

const grid=3;

let timer;
let timeLeft=40;   // ✅ 40 seconds



/* PAGE SWITCH */

function showPage(page){

document
.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));

page.classList.add("active");

}



/* START */

enterBtn.onclick = checkAccess;

passwordInput.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){
checkAccess();
}

});


function checkAccess(){

const entered =
passwordInput.value
.trim()
.toLowerCase();

if(entered === ACCESS_PASSWORD){

showPage(puzzlePage);

createPuzzle();
startTimer();

bgMusic.volume=0.5;
bgMusic.play().catch(()=>{});

}
else{

passMsg.textContent =
"Incorrect password";

document.querySelector(".pass-box")
.style.animation="shake .3s";

setTimeout(()=>{
document.querySelector(".pass-box")
.style.animation="";
},400);

}

}



/* TIMER */

function startTimer(){

clearInterval(timer);

timeLeft=40;

timer=setInterval(()=>{

timeLeft--;

timerText.textContent=timeLeft;

if(timeLeft<=0){

location.reload();

}

},1000);

}



/* CREATE PUZZLE */

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



/* ======================
   WIN CONDITION
====================== */

function checkWin(){

let solved=
pieces.every(
(p,i)=>p.dataset.current==i
);

if(!solved) return;

clearInterval(timer);


/* PHONE VIBRATION */

if(navigator.vibrate){
navigator.vibrate([200,100,200]);
}


/* CHANGE MUSIC */

bgMusic.pause();
winMusic.volume=0.7;
winMusic.play().catch(()=>{});


/* CUPID ARROW */

shootArrow();


/* CONFETTI */

setTimeout(spawnConfetti,600);


/* MOVE PAGE */

setTimeout(()=>{

showPage(cluePage);

},1700);

}



/* ======================
   CUPID ARROW
====================== */

function shootArrow(){

arrow.style.display="block";

arrow.style.position="fixed";
arrow.style.left="-100px";
arrow.style.top="50%";

arrow.style.fontSize="40px";

arrow.animate(

[
{ transform:"translateX(0)" },
{ transform:"translateX(120vw)" }

],

{
duration:1200,
easing:"ease-in-out"
}

);

setTimeout(()=>{
arrow.style.display="none";
},1300);

}



/* ======================
   HEART CONFETTI
====================== */

function spawnConfetti(){

const emojis=[
"💖","💕","❤️","💘","🌹"
];

for(let i=0;i<60;i++){

const c=document.createElement("div");

c.innerHTML=
emojis[Math.floor(Math.random()*emojis.length)];

c.style.position="fixed";

c.style.left=Math.random()*100+"vw";
c.style.top="-20px";

c.style.fontSize=
(18+Math.random()*20)+"px";

c.style.zIndex="999";

c.style.animation=
`fall ${3+Math.random()*2}s linear`;

document.body.appendChild(c);

setTimeout(()=>{
c.remove();
},5000);

}

}



/* CONFETTI FALL */

const style=document.createElement("style");

style.innerHTML=`

@keyframes fall{

0%{
transform:translateY(-20px) rotate(0);
opacity:1;
}

100%{
transform:translateY(110vh) rotate(720deg);
opacity:0;
}

}

#arrow{
display:none;
z-index:9999;
}

`;

document.head.appendChild(style);