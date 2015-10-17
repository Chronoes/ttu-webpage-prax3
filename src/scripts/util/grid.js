const React = require('react');

const Cell = require('../components/grid/Cell');
const Empty = require('../components/Empty');
const Ship = require('../components/Ship');

const ADJACENTS = [
  {row: 0, col: 1},
  {row: -1, col: 0},
  {row: 0, col: -1},
  {row: 1, col: 0},
];

function isValidSquare(grid, row, col) {
  var isValid = isInBorders(grid.length, row, col) && isEmptySquare(grid, row, col);
  for (var i = 0; i < ADJACENTS.length && isValid; i++) {
    const checkRow = row + ADJACENTS[i].row;
    const checkCol = col + ADJACENTS[i].col;
    if (isInBorders(grid.length, checkRow, checkCol)) {
      isValid = isEmptySquare(grid, checkRow, checkCol);
    }
  }
  return isValid;
}

function isEmptySquare(grid, row, col) {
  return grid[row][col].props.children.type.displayName === Empty.displayName;
}

function isInBorders(boardSize, row, col) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

function randomNumber(mult) {
  return Math.floor(Math.random() * mult);
}


function updateGridWithShips(ships, grid) {
  for (var i = 0; i < ships.length; i++) {
    const {coords} = ships[i].props;
    for (var len = 0; len < Ship.LENGTH; len++) {
      grid[coords.start.row][coords.start.col + len] = <Cell>{ships[i]}</Cell>;
    }
  }
  return grid;
}

module.exports = {
  isValidSquare,
  isEmptySquare,
  isInBorders,
  randomNumber,
  updateGridWithShips,
};
