/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

const createBoardArray = (rows) => {
  const board = [];

  for (let row = 0; row < rows; row++) {
    board.push(Array.from({ length: rows }, () => '_'));
  }

  return board;
};

const getCellPlacement = (index, numberOfRows) => {
  const row = Math.floor(index / numberOfRows);
  const col = index % numberOfRows;

  return [row, col];
};

export {
  createBoardArray,
  getCellPlacement,
};
