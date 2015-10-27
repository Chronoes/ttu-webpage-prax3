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

function isEmptyCell(cell) {
  return cell.props.children.type.displayName === Empty.displayName;
}

function isEmptySquare(grid, row, col) {
  return isEmptyCell(grid[row][col]);
}

function isInBorders(boardSize, row, col) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

function hasShip(ships, row, col) {
  for (var i = 0; i < ships.length; i++) {
    const {coords} = ships[i].props;
    for (var len = 0; len < Ship.LENGTH; len++) {
      if (coords.start.col + len === col && coords.start.row === row) {
        return true;
      }
    }
  }
  return false;
}

function randomNumber(mult) {
  return Math.floor(Math.random() * mult);
}

function updateGridWithShip(grid, ship) {
  const {coords} = ship.props;
  grid[coords.start.row][coords.start.col] =  <Cell primary>{ship}</Cell>;
  for (var len = 1; len < Ship.LENGTH; len++) {
    grid[coords.start.row][coords.start.col + len] = <Cell>{ship}</Cell>;
  }
  return grid;
}

module.exports = {
  isValidSquare,
  isEmptyCell,
  isEmptySquare,
  isInBorders,
  hasShip,
  randomNumber,
  updateGridWithShip,
};
