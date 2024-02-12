/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

let currentPlayer = 'X';
const NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;

const createBoardArray = () => {
  const board = [];

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    board.push(Array.from({ length: NUMBER_OF_ROWS }, () => '_'));
  }

  return board;
};
let board = createBoardArray();
const resetButton = document.querySelector('#reset');

const getCellPlacement = (index, numberOfRows) => {
  const row = Math.floor(index / numberOfRows);
  const col = index % numberOfRows;

  return [row, col];
};

const checkRows = (currentPlayerMark) => {
  let column = 0;

  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    while (column < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayerMark) {
        column = 0;
        break;
      }
      column += 1;
    }

    if (column === NUMBER_OF_ROWS) {
      return true;
    }
  }
  return false;
};

const checkColumns = () => {
  let row = 0;

  for (let column = 0; column < NUMBER_OF_ROWS; column++) {
    while (row < NUMBER_OF_ROWS) {
      if (board[row][column] !== currentPlayer) {
        row = 0;
        break;
      }
      row += 1;
    }

    if (row === NUMBER_OF_ROWS) {
      return true;
    }
  }
  return false;
};

const checkDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][count] !== currentPlayer) {
      count = 0;
      break;
    }
    count += 1;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
  return false;
};

const checkReverseDiagonals = () => {
  let count = 0;

  while (count < NUMBER_OF_ROWS) {
    if (board[count][NUMBER_OF_ROWS - 1 - count] !== currentPlayer) {
      count = 0;
      break;
    }
    count += 1;
  }

  if (count === NUMBER_OF_ROWS) {
    return true;
  }
  return false;
};

const checkWin = (currentPlayerMark) => {
  // return (
  //     checkRows(currentPlayer) ||
  //     checkColumns(currentPlayer) ||
  //     checkDiagonals(currentPlayer) ||
  //     checkReverseDiagonals(currentPlayer)
  //   );
  if (checkRows(currentPlayerMark)) return true;

  if (checkColumns(currentPlayerMark)) return true;

  if (checkDiagonals(currentPlayerMark)) return true;

  if (checkReverseDiagonals(currentPlayerMark)) return true;
  return false;
};
const resultElm = document.querySelector('.result');
const resetBoard = () => {
  document.querySelector('.board').remove();
  createBoard();
  board = createBoardArray();
  resultElm.classList.remove('appear-result');

  currentPlayer = 'X';
  turnsCounter = 0;
};
const resultMessage = document.querySelector('.result__message');
const displayResult = (message) => {
  resultMessage.textContent = message;
  resultElm.classList.add('appear-result');
};

const runWinEvent = (currentPlayerMark) => {
  setTimeout(() => {
    displayResult(`Player ${currentPlayerMark} won!`);
    // resetBoard();
  }, 100);
};

const runDrawEvent = () => {
  setTimeout(() => {
    displayResult('Draw!');
    // resetBoard();
  }, 100);
};

const drawMarkInCell = (cell, currentPlayerMark) => {
  cell.querySelector('.value').textContent = currentPlayerMark;
  cell.classList.add(`cell--${currentPlayerMark}`);
};

const cellClickHandler = (event, index) => {
  const cell = event.target;
  const [row, col] = getCellPlacement(index, NUMBER_OF_ROWS);

  if (board[row][col] === '_') {
    turnsCounter += 1;
    board[row][col] = currentPlayer;

    drawMarkInCell(cell, currentPlayer);

    if (checkWin(currentPlayer)) {
      runWinEvent(currentPlayer);
    } else {
      turnsCounter === turns && runDrawEvent();

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
};

const createCell = (index) => {
  const cellElementString = `<div class="cell" role="button" tabindex="${index + 1}"><span class="value"></span></div>`;
  const cellElement = document.createRange().createContextualFragment(cellElementString);

  cellElement.querySelector('.cell').onclick = (event) => cellClickHandler(event, index);
  cellElement.querySelector('.cell').onkeydown = (event) => (event.key === 'Enter' ? cellClickHandler(event, index) : true);

  return cellElement;
};

const createBoard = () => {
  const container = document.querySelector('.container');
  const board = document.createElement('div');

  board.classList.add('board');

  for (let i = 0; i < NUMBER_OF_ROWS ** 2; i++) {
    const cellElement = createCell(i);
    board.appendChild(cellElement);
    document.documentElement.style.setProperty('--grid-rows', NUMBER_OF_ROWS);
  }

  container.insertAdjacentElement('afterbegin', board);
};

resetButton.addEventListener('click', resetBoard);
createBoard();
