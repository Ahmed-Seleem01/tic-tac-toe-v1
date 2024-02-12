/* eslint-disable import/extensions */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import { createBoardArray, getCellPlacement } from './util.js';
import {
  checkRows, checkColumns, checkDiagonals, checkReverseDiagonals,
} from './checkCells.js';

let currentPlayer = 'X';
const NUMBER_OF_ROWS = 3;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;

let board = createBoardArray(NUMBER_OF_ROWS);
const resetButton = document.querySelector('#reset');

const checkWin = (currentPlayerMark) => {
  // return (
  //     checkRows(currentPlayer) ||
  //     checkColumns(currentPlayer) ||
  //     checkDiagonals(currentPlayer) ||
  //     checkReverseDiagonals(currentPlayer)
  //   );
  if (checkRows(currentPlayerMark, NUMBER_OF_ROWS, board)) return true;

  if (checkColumns(currentPlayerMark, NUMBER_OF_ROWS, board)) return true;

  if (checkDiagonals(currentPlayerMark, NUMBER_OF_ROWS, board)) return true;

  if (checkReverseDiagonals(currentPlayerMark, NUMBER_OF_ROWS, board)) return true;
  return false;
};

const resultElm = document.querySelector('.result');
const resetBoard = () => {
  document.querySelector('.board').remove();
  createBoard();
  board = createBoardArray(NUMBER_OF_ROWS);
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
