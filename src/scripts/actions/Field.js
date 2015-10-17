const React = require('react');

const alt = require('../altInstance');
const Cell = require('../components/grid/Cell');
const Empty = require('../components/Empty');
const Ship = require('../components/Ship');
const {isValidSquare, randomNumber} = require('../util/grid');

const FieldActions = alt.createActions({
  createFieldFor: function(player, size) {
    return {player, grid: FieldActions.createField(size)};
  },

  createField: function(size) {
    for (var grid = []; grid.length < size;) {
      for (var subgrid = []; subgrid.push(<Cell><Empty /></Cell>) < size;);
      grid.push(subgrid);
    }
    return grid;
  },

  placeShipsFor: function(player, grid, count) {
    const size = grid.length;
    var ships = [];
    for (var i = 0; i < count; i++) {
      var tries = 0;
      while (tries < 20) {
        const row = randomNumber(size - 1);
        const col = randomNumber(size - 1);
        var validShip = true;
        for (var len = 0; len < Ship.LENGTH && validShip; len++) {
          validShip = isValidSquare(grid, row, col + len);
        }

        if (validShip) {
          var coords = {start: {row, col}, orientation: Ship.HORIZONTAL};
          ships.push(<Ship coords={coords} />);
          break;
        }
        tries++;
      }
    }
    return {player, ships};
  },

  updateCell: function(cell, row, col) {
    return {
      cell: React.cloneElement(cell, {cellClicked: true}),
      row, col,
    };
  },
});

module.exports = FieldActions;
