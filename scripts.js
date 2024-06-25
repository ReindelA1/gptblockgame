const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = [];
const rows = 20;
const cols = 20;
const blockSize = 30;
let selectedBlock = 'basic';
const blockColors = {
    'basic': '#0000FF',
    'sticky': '#FF0000',
    'bouncy': '#00FF00',
    'fragile': '#FFFF00',
    'magnet': '#FF00FF'
};

let blocks = {
    'basic': [],
    'sticky': [],
    'bouncy': [],
    'fragile': [],
    'magnet': []
};

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
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
            grid[row][col] = null;
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
    for (const type in blocks) {
        blocks[type].forEach(block => {
            ctx.fillStyle = blockColors[type];
            ctx.fillRect(block.x, block.y, blockSize, blockSize);
        });
    }
}

function onMouseDown(event) {
    const { offsetX, offsetY } = event;
    const block = getBlockAt(offsetX, offsetY);
    if (block) {
        isDragging = true;
        dragBlock = block;
        dragOffsetX = offsetX - block.x;
        dragOffsetY = offsetY - block.y;
    }
}

function onMouseMove(event) {
    if (isDragging && dragBlock) {
        const { offsetX, offsetY } = event;
        dragBlock.x = offsetX - dragOffsetX;
        dragBlock.y = offsetY - dragOffsetY;
        drawGrid();
    }
}

function onMouseUp() {
    isDragging = false;
    dragBlock = null;
}

function onCanvasClick(event) {
    const { offsetX, offsetY } = event;
    const col = Math.floor(offsetX / blockSize);
    const row = Math.floor(offsetY / blockSize);
    if (!grid[row][col]) {
        addBlock(selectedBlock, col, row);
        grid[row][col] = selectedBlock;
        drawGrid();
    }
}

function getBlockAt(x, y) {
    for (const type in blocks) {
        for (const block of blocks[type]) {
            if (x >= block.x && x < block.x + blockSize && y >= block.y && y < block.y + blockSize) {
                return block;
            }
        }
    }
    return null;
}

function addBlock(type, col, row) {
    blocks[type].push({ x: col * blockSize, y: row * blockSize });
}

function resetGame() {
    blocks = {
        'basic': [],
        'sticky': [],
        'bouncy': [],
        'fragile': [],
        'magnet': []
    };
    initGrid();
    drawGrid();
}
