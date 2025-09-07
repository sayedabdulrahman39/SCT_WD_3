const board = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const playerModeBtn = document.getElementById("playerMode");
const computerModeBtn = document.getElementById("computerMode");

let cells = [];
let currentPlayer = "X";
let gameActive = false;
let vsComputer = false;
let gameState = Array(9).fill("");

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize board
function createBoard() {
  board.innerHTML = "";
  cells = [];
  gameState = Array(9).fill("");
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function computerMove() {
  let emptyIndexes = gameState.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  if (emptyIndexes.length === 0) return;

  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  gameState[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
  cells[randomIndex].classList.add("taken");

  if (checkWinner()) {
    statusText.textContent = `Computer Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset Game
resetBtn.addEventListener("click", createBoard);

// Mode Selection
playerModeBtn.addEventListener("click", () => {
  vsComputer = false;
  currentPlayer = "X";
  createBoard();
});

computerModeBtn.addEventListener("click", () => {
  vsComputer = true;
  currentPlayer = "X";
  createBoard();
});

// Start default as 2 players
createBoard();
