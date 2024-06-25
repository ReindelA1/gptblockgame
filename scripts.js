const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const blockSize = 30;
const rows = Math.floor(canvas.height / blockSize);
const cols = Math.floor(canvas.width / blockSize);
const blockColors = {
    'basic': '#0000FF',
    'sticky': '#FF0000',
    'bouncy': '#00FF00',
    'fragile': '#FFFF00',
    'magnet': '#FF00FF'
};

let blocks = [];
let draggedBlock = null;

document.getElementById('resetBtn').addEventListener('click', resetGame);
canvas.addEventListener('dragover', allowDrop);
canvas.addEventListener('drop', onDrop);

const sidebarBlocks = document.querySelectorAll('#sidebar .block');
sidebarBlocks.forEach(block => {
    block.addEventListener('dragstart', onDragStart);
});

initGrid();
drawGrid();

function initGrid() {
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
            ctx.fillStyle = blockColors[block.type];
            ctx.fillRect(block.x, block.y, blockSize, blockSize);
        }
    });
}

function onDragStart(event) {
    draggedBlock = event.target.dataset.type;
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
    blocks[blockIndex].type = draggedBlock;
    drawGrid();
}

function resetGame() {
    blocks.forEach(block => block.type = null);
    drawGrid();
}
