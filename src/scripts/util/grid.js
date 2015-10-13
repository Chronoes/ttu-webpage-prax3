const Empty = require('../components/Empty');

const ADJACENTS = [
  {row: 0, col: 1},
  {row: -1, col: 0},
  {row: 0, col: -1},
  {row: 1, col: 0},
];

function isValidSquare(grid, row, col) {
  var isValid = true;
  for (var i = 0; i < ADJACENTS.length && isValid; i++) {
    const checkRow = row + ADJACENTS[i].row;
    const checkCol = col + ADJACENTS[i].col;
    if (isInBorders(grid, checkRow, checkCol)) {
      isValid = isEmptySquare(grid, checkRow, checkCol);
    }
  }
  return isValid;
}

function isEmptySquare(grid, row, col) {
  return grid[row][col].type.displayName === Empty.displayName;
}

function isInBorders(grid, row, col) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid.length;
}

function randomNumber(mult) {
  return Math.floor(Math.random() * mult);
}

module.exports = {
  isValidSquare,
  isEmptySquare,
  isInBorders,
  randomNumber,
};
