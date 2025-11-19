// -------------------------
// ROOM DATA
// -------------------------

const rooms = [
    { 
        id: 0,
        image: "assets/room1.png",
        hotspots: [
            { x: 300, y: 400, w: 120, h: 80, action: () => pickItem("Note: Symbol X") },
            { x: 650, y: 350, w: 150, h: 150, action: () => showMessage("The safe is locked.") }
        ]
    },
    { 
        id: 1,
        image: "assets/room2.png",
        hotspots: [
            { x: 400, y: 300, w: 200, h: 200, action: () => pickItem("Fuse") },
            { x: 150, y: 200, w: 100, h: 200, action: () => showMessage("Blood-stained note: 7-") }
        ]
    },
    {
        id: 2,
        image: "assets/room3.png",
        hotspots: [
            { x: 200, y: 250, w: 300, h: 300, action: () => pickItem("Cipher Wheel") }
        ]
    },
    {
        id: 3,
        image: "assets/room4.png",
        hotspots: [
            { x: 550, y: 350, w: 150, h: 200, action: () => keypadPuzzle() }
        ]
    },
    {
        id: 4,
        image: "assets/room5.png",
        hotspots: [
            { x: 300, y: 300, w: 200, h: 300, action: () => finalPuzzle() }
        ]
    }
];

let currentRoom = 0;
let inventory = [];

const roomImage = document.getElementById("roomImage");
const inventoryList = document.getElementById("inventoryList");
const messageBox = document.getElementById("messageBox");

// -------------------------
// Basic Game Functions
// -------------------------

function loadRoom(id) {
    currentRoom = id;
    roomImage.src = rooms[id].image;
}

function pickItem(item) {
    if (!inventory.includes(item)) {
        inventory.push(item);
        updateInventory();
        showMessage("Added: " + item);
    }
}

function updateInventory() {
    inventoryList.innerHTML = "";
    inventory.forEach(i => {
        let li = document.createElement("li");
        li.textContent = i;
        inventoryList.appendChild(li);
    });
}

function showMessage(text) {
    messageBox.textContent = text;
    messageBox.style.display = "block";
    setTimeout(() => messageBox.style.display = "none", 2000);
}

// -------------------------
// Puzzles
// -------------------------

function keypadPuzzle() {
    let code = prompt("Enter 4-digit code:");
    if (code === "7291") {
        showMessage("Door unlocked!");
        loadRoom(4);
    } else showMessage("Incorrect.");
}

function finalPuzzle() {
    if (inventory.length < 4) {
        showMessage("You need all clues before solving this.");
        return;
    }
    showMessage("You take the Sapphire…");
    setTimeout(() => {
        document.getElementById("game-screen").classList.add("hidden");
        document.getElementById("end-screen").classList.remove("hidden");
    }, 1500);
}

// -------------------------
// Hotspot click detection
// -------------------------

roomImage.addEventListener("click", (e) => {
    const rect = roomImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rooms[currentRoom].hotspots.forEach(h => {
        if (x > h.x && x < h.x + h.w && y > h.y && y < h.y + h.h) {
            h.action();
        }
    });
});

// -------------------------
// Title screen + bg music
// -------------------------

document.getElementById("startBtn").onclick = () => {
    document.getElementById("title-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");

    loadRoom(0);

    document.getElementById("bgm").play();
};

document.getElementById("restartBtn").onclick = () => {
    location.reload();
};
