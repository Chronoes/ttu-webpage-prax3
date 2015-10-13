const React = require('react');

const alt = require('../altInstance');
const Empty = require('../components/Empty');
const Ship = require('../components/Ship');
const {isValidSquare, randomNumber} = require('../util/grid');

const FieldActions = alt.createActions({
  createField: function(size) {
    for (var grid = []; grid.length < size;) {
      for (var subgrid = []; subgrid.push(<Empty />) < size;);
      grid.push(subgrid);
    }
    return grid;
  },

  placeShips: function(grid, count) {
    const size = grid.length;
    var updatedGrid = grid;
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
          const shipElement = <Ship coords={coords} />;
          ships.push(shipElement);
          for (len = 0; len < Ship.LENGTH; len++) {
            updatedGrid[coords.start.row][coords.start.col + len] = shipElement;
          }
          break;
        }
        tries++;
      }
    }
    return {ships, updatedGrid};
  },
});

module.exports = FieldActions;
