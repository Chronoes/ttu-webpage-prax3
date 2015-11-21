import React from 'react';

import Cell from '../components/grid/Cell';
import Empty from '../components/Empty';
import Ship from '../components/Ship';

const ADJACENTS = [
  {row: 0, col: 1},
  {row: -1, col: 0},
  {row: 0, col: -1},
  {row: 1, col: 0},
];

export function isEmptyCell(cell) {
  return cell.props.children.type === Empty;
}

export function isEmptySquare(grid, row, col) {
  return isEmptyCell(grid[row][col]);
}

export function isInBorders(boardSize, row, col) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

export function isValidSquare(grid, row, col) {
  let isValid = isInBorders(grid.length, row, col) && isEmptySquare(grid, row, col);
  for (let i = 0; i < ADJACENTS.length && isValid; i++) {
    const checkRow = row + ADJACENTS[i].row;
    const checkCol = col + ADJACENTS[i].col;
    if (isInBorders(grid.length, checkRow, checkCol)) {
      isValid = isEmptySquare(grid, checkRow, checkCol);
    }
  }
  return isValid;
}

export function hasShip(ships, cell) {
  return ships.indexOf(cell.props.children) !== -1;
}

export function randomNumber(mult) {
  return Math.floor(Math.random() * mult);
}

export function updateGridWithShip(grid, ship) {
  const {coords} = ship.props;
  grid[coords.start.row][coords.start.col] = <Cell primary>{ship}</Cell>;
  for (let len = 1; len < Ship.LENGTH; len++) {
    grid[coords.start.row][coords.start.col + len] = <Cell>{ship}</Cell>;
  }
  return grid;
}

export function countShots(grid) {
  return grid.reduce(function(prevRow, row) {
    return prevRow + row.filter(function(cell) {
      return cell.props.cellClicked;
    }).length;
  }, 0);
}
