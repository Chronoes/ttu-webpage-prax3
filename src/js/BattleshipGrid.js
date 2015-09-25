var Immutable = require('immutable');

var EMPTY_CELL = -1;
// var MISSED_CELL = -2;
// var SHIP_SUNK = 0;
// var SHIP_GUNBOAT = 2;

function newGrid(size) {
  return Immutable.Repeat(Immutable.Repeat(EMPTY_CELL, size), size);
}

exports.newGrid = newGrid;
