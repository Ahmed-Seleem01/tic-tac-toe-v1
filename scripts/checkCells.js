/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

const checkRows = (currentPlayerMark, rows, board) => {
  let column = 0;

  for (let row = 0; row < rows; row++) {
    while (column < rows) {
      if (board[row][column] !== currentPlayerMark) {
        column = 0;
        break;
      }
      column += 1;
    }

    if (column === rows) {
      return true;
    }
  }
  return false;
};

const checkColumns = (currentPlayerMark, rows, board) => {
  let row = 0;

  for (let column = 0; column < rows; column++) {
    while (row < rows) {
      if (board[row][column] !== currentPlayerMark) {
        row = 0;
        break;
      }
      row += 1;
    }

    if (row === rows) {
      return true;
    }
  }
  return false;
};

const checkDiagonals = (currentPlayerMark, rows, board) => {
  let count = 0;

  while (count < rows) {
    if (board[count][count] !== currentPlayerMark) {
      count = 0;
      break;
    }
    count += 1;
  }

  if (count === rows) {
    return true;
  }
  return false;
};

const checkReverseDiagonals = (currentPlayerMark, rows, board) => {
  let count = 0;

  while (count < rows) {
    if (board[count][rows - 1 - count] !== currentPlayerMark) {
      count = 0;
      break;
    }
    count += 1;
  }

  if (count === rows) {
    return true;
  }
  return false;
};

export {
  checkRows,
  checkColumns,
  checkDiagonals,
  checkReverseDiagonals,
};
