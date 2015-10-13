var React = require('react');

var utilReact = require('../../util/React');
var Cell = require('./Cell');

var Grid = React.createClass({displayName: 'Grid',
  handleClick: function(row, col) {
    console.log('Clicked pos: ' + row + ' ' + col);
  },

  render: function() {
    var field = this.props.fieldState.get('field');
    return (
      React.DOM.table(null,
        utilReact.spread(React.DOM.tbody, null,
          field.map(function(row, rowIdx) {
            return utilReact.spread(React.DOM.tr, null,
              row.map(function(value, colIdx) {
                return React.createElement(Cell, {value: value, onClick: this.handleClick.bind(this, rowIdx, colIdx)});
              }.bind(this)));
          }.bind(this)))
      )
    );
  },
});

module.exports = Grid;

// function Cell() {
//   return {
//     type: Ships.Empty,
//     status: consts.STATES.unstruck
//   };
// }

// function setSquare(grid, pos, value) {
//   if (isValidSquare(grid, pos)) {
//     grid[pos.row][pos.col] = value;
//     return grid;
//   }
//   return false;
// }

// function getSquare(grid, pos) {
//   return grid[pos.row][pos.col];
// }

// function isValidSquare(grid, pos) {
//   var isValid = true;
//   for (var i = 0; i < consts.ADJACENTS.length; i++) {
//     var checkPos = {row: pos.row + consts.ADJACENTS[i].row, col: pos.col + consts.ADJACENTS[i].col};
//     if (isInBorders(grid, checkPos)) {
//       isValid = isEmptySquare(grid, checkPos);
//       if (!isValid) {
//         break;
//       }
//     }
//   }
//   return isValid;
// }

// function isInBorders(grid, pos) {
//   return pos.row >= 0 && pos.row < grid.length
//     && pos.col >= 0 && pos.col < grid.length;
// }

// function isEmptySquare(grid, pos) {
//   return getSquare(grid, pos).type === Cell().type;
// }

// module.exports = {
//   Cell: Cell,
//   Grid: Grid,
//   setSquare: setSquare
// };
