// -------------------
// ROOM IMAGE MAPPING
// -------------------

const rooms = [
    { id:0, img:"assets/img2.jpg", hotspots:[
        {x:300,y:400,w:120,h:80,action:()=> pick("Note: 729")},
        {x:650,y:350,w:150,h:150,action:()=> msg("The safe is locked.")}
    ]},
    { id:1, img:"assets/img3.jpg", hotspots:[
        {x:400,y:300,w:200,h:200,action:()=> pick("Fuse")},
        {x:150,y:200,w:100,h:200,action:()=> msg("Blood note: 7-")}
    ]},
    { id:2, img:"assets/img4.jpg", hotspots:[
        {x:200,y:250,w:300,h:300,action:()=> pick("Cipher Wheel")}
    ]},
    { id:3, img:"assets/img5.jpg", hotspots:[
        {x:550,y:350,w:150,h:200,action:()=> keypad()}
    ]},
    { id:4, img:"assets/img6.jpg", hotspots:[
        {x:300,y:300,w:200,h:300,action:()=> finalPuzzle()}
    ]}
];

let currentRoom = 0;
let inventory = [];

const roomImage = document.getElementById("roomImage");
const invList = document.getElementById("inventoryList");
const msgBox = document.getElementById("messageBox");

// -------------------
// Core Functions
// -------------------

function loadRoom(i){
    currentRoom = i;
    roomImage.src = rooms[i].img;
}

function pick(item){
    if(!inventory.includes(item)){
        inventory.push(item);
        updateInv();
        msg("Picked: " + item);
    }
}

function updateInv(){
    invList.innerHTML = "";
    inventory.forEach(i=>{
        let li=document.createElement("li");
        li.textContent=i;
        invList.appendChild(li);
    });
}

function msg(t){
    msgBox.innerText = t;
    msgBox.style.display="block";
    setTimeout(()=> msgBox.style.display="none",2000);
}

// -------------------
// Puzzles
// -------------------

function keypad(){
    let code = prompt("Enter 4-digit code:");
    if(code === "7291"){
        msg("Door unlocked!");
        loadRoom(4);
    } else msg("Incorrect code.");
}

function finalPuzzle(){
    if(inventory.length < 4){
        msg("You need more clues.");
        return;
    }
    msg("You take the Sapphire...");
    setTimeout(()=>{
        document.getElementById("game-screen").classList.add("hidden");
        document.getElementById("end-screen").classList.remove("hidden");
    },1500);
}

// -------------------
// Hotspot detection
// -------------------

roomImage.addEventListener("click", e=>{
    const r = roomImage.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    rooms[currentRoom].hotspots.forEach(h=>{
        if(x>h.x && x<h.x+h.w && y>h.y && y<h.y+h.h){
            h.action();
        }
    });
});

// -------------------
// Title + Restart
// -------------------

document.getElementById("startBtn").onclick = ()=>{
    document.getElementById("title-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    loadRoom(0);
    document.getElementById("bgm").play();
};

document.getElementById("restartBtn").onclick = ()=>{
    location.reload();
};
