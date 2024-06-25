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
let isDragging = false;
let dragBlock = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

document.getElementById('resetBtn').addEventListener('click', resetGame);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('click', onCanvasClick);

initGrid();
drawGrid();

function initGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            addBlock('basic', col, row); // Adding 'basic' block to all grid cells initially for visibility
        }
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.strokeStyle = '#ccc';
            ctx.strokeRect(col * blockSize, row * blockSize, blockSize, blockSize);
        }
    }
    drawBlocks();
}

function drawBlocks() {
    blocks.forEach(block => {
        ctx
