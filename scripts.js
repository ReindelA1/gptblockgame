const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const blockSize = 60; // Adjusted to accommodate larger shapes
const rows = Math.floor(canvas.height / blockSize);
const cols = Math.floor(canvas.width / blockSize);
let selectedColor = '#0000FF';
const shapes = {
    circle: drawCircle,
    triangle: drawTriangle,
    pentagon: drawPentagon,
    hexagon: drawHexagon
};

let blocks = [];
let draggedShape = null;

document.getElementById('resetBtn').addEventListener('click', resetGame);
canvas.addEventListener('dragover', allowDrop);
canvas.addEventListener('drop', onDrop);
document.getElementById('colorSelector').addEventListener('input', (e) => {
    selectedColor = e.target.value;
});

const sidebarBlocks = document.querySelectorAll('#sidebar .block');
sidebarBlocks.forEach(block => {
    block.addEventListener('dragstart', onDragStart);
});

initGrid();
drawGrid();

function initGrid() {
    blocks = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            blocks.push({ type: null, x: col * blockSize, y: row * blockSize });
        }
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.strokeStyle = '#FFA500';
            ctx.strokeRect(col * blockSize, row * blockSize, blockSize, blockSize);
        }
    }
    drawBlocks();
}

function drawBlocks() {
    blocks.forEach(block => {
        if (block.type) {
            ctx.fillStyle = block.color;
            shapes[block.type](block.x + blockSize / 2, block.y + blockSize / 2, blockSize / 2);
        }
    });
}

function onDragStart(event) {
    draggedShape = event.target.dataset.type;
}

function allowDrop(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    const { offsetX, offsetY } = event;
    const col = Math.floor(offsetX / blockSize);
    const row = Math.floor(offsetY / blockSize);
    const blockIndex = row * cols + col;
    blocks[blockIndex] = { type: draggedShape, x: col * blockSize, y: row * blockSize, color: selectedColor };
    drawGrid();
}

function resetGame() {
    blocks.forEach(block => block.type = null);
    drawGrid();
}

// Shape drawing functions
function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function drawTriangle(x, y, size) {
    const height = size * Math.sqrt(3) / 2;
    ctx.beginPath();
    ctx.moveTo(x, y - height / 2);
    ctx.lineTo(x - size / 2, y + height / 2);
    ctx.lineTo(x + size / 2, y + height / 2);
    ctx.closePath();
    ctx.fill();
}

function drawPentagon(x, y, size) {
    const angle = Math.PI * 2 / 5;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const xPos = x + size * Math.cos(angle * i - Math.PI / 2);
        const yPos = y + size * Math.sin(angle * i - Math.PI / 2);
        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
    }
    ctx.closePath();
    ctx.fill();
}

function drawHexagon(x, y, size) {
    const angle = Math.PI * 2 / 6;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const xPos = x + size * Math.cos(angle * i);
        const yPos = y + size * Math.sin(angle * i);
        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
    }
    ctx.closePath();
    ctx.fill();
}
