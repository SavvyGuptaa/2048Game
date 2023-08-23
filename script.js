const boardElement = document.getElementById('board');
const newGameButton = document.getElementById('newGameButton');
const tiles = [];
const gridSize = 4;

let board = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

function createBoard() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = '';
      tiles.push(tile);
      boardElement.appendChild(tile);
    }
  }

  generateTile();
  generateTile();
}

function generateTile() {
  const emptyTiles = tiles.filter(tile => tile.textContent === '');
  if (emptyTiles.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const newValue = Math.random() < 0.9 ? 2 : 4;
  const tile = emptyTiles[randomIndex];
  const index = tiles.indexOf(tile);
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  tile.textContent = newValue;
  board[row][col] = newValue;
  updateBoard();
}

function updateBoard() {
  tiles.forEach((tile, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const value = board[row][col];
    tile.style.backgroundColor = value === 0 ? '#ccc' : `hsl(${value * 30}, 50%, 50%)`;
    tile.textContent = value === 0 ? '' : value;
  });
}

newGameButton.addEventListener('click', newGame);
document.addEventListener('keydown', moveTiles);

function newGame() {
  board = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
  tiles.forEach(tile => tile.remove());
  tiles.length = 0;
  createBoard();
  updateBoard();
}

function moveTiles(event) {
  const key = event.key;
  let moved = false;

  switch (key) {
    case 'ArrowUp':
      moved = moveUp();
      break;
    case 'ArrowDown':
      moved = moveDown();
      break;
    case 'ArrowLeft':
      moved = moveLeft();
      break;
    case 'ArrowRight':
      moved = moveRight();
      break;
  }

  if (moved) {
    generateTile();
  }
}

function moveUp() {
    let moved = false;
    for (let col = 0; col < gridSize; col++) {
      for (let row = 1; row < gridSize; row++) {
        if (board[row][col] !== 0) {
          for (let i = row; i > 0; i--) {
            if (board[i - 1][col] === 0 || board[i - 1][col] === board[i][col]) {
              board[i - 1][col] += board[i][col];
              board[i][col] = 0;
              moved = true;
            }
          }
        }
      }
    }
    return moved;
  }
  
  function moveDown() {
    let moved = false;
    for (let col = 0; col < gridSize; col++) {
      for (let row = gridSize - 2; row >= 0; row--) {
        if (board[row][col] !== 0) {
          for (let i = row; i < gridSize - 1; i++) {
            if (board[i + 1][col] === 0 || board[i + 1][col] === board[i][col]) {
              board[i + 1][col] += board[i][col];
              board[i][col] = 0;
              moved = true;
            }
          }
        }
      }
    }
    return moved;
  }
  
  function moveLeft() {
    let moved = false;
    for (let row = 0; row < gridSize; row++) {
      for (let col = 1; col < gridSize; col++) {
        if (board[row][col] !== 0) {
          for (let i = col; i > 0; i--) {
            if (board[row][i - 1] === 0 || board[row][i - 1] === board[row][i]) {
              board[row][i - 1] += board[row][i];
              board[row][i] = 0;
              moved = true;
            }
          }
        }
      }
    }
    return moved;
  }
  
  function moveRight() {
    let moved = false;
    for (let row = 0; row < gridSize; row++) {
      for (let col = gridSize - 2; col >= 0; col--) {
        if (board[row][col] !== 0) {
          for (let i = col; i < gridSize - 1; i++) {
            if (board[row][i + 1] === 0 || board[row][i + 1] === board[row][i]) {
              board[row][i + 1] += board[row][i];
              board[row][i] = 0;
              moved = true;
            }
          }
        }
      }
    }
    return moved;
  }
  

// Implement the moveUp, moveDown, moveLeft, and moveRight functions
// These functions should handle the game mechanics and update the board

createBoard();
